-- ============================================================
-- create_appointment — atomic, validated booking function
--
-- All business rules are enforced here so the API route only
-- needs to do input-validation and call this RPC.
-- The EXCLUDE constraint on appointments handles concurrent
-- booking attempts: the second INSERT raises exclusion_violation
-- which is caught and returned as a user-friendly error.
-- ============================================================

CREATE OR REPLACE FUNCTION create_appointment(
  p_service_slug    TEXT,
  p_patient_name    TEXT,
  p_patient_phone   TEXT,
  p_patient_email   TEXT,
  p_reason_for_visit TEXT,
  p_appointment_start TIMESTAMPTZ,
  p_appointment_end   TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_service_id       UUID;
  v_service_name     TEXT;
  v_service_duration INTEGER;
  v_weekday          SMALLINT;
  v_hours            RECORD;
  v_break_exists     BOOLEAN := FALSE;
  v_blocked_exists   BOOLEAN := FALSE;
  v_booking_ref      TEXT;
  v_appointment_id   UUID;
BEGIN

  -- ① Validate service
  SELECT id, name, duration_minutes
    INTO v_service_id, v_service_name, v_service_duration
    FROM services
   WHERE slug = p_service_slug AND is_active = TRUE;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'service_inactive',
      'message', 'Selected service is not available'
    );
  END IF;

  -- ② Appointment must be in the future
  IF p_appointment_start <= NOW() THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'past_date',
      'message', 'Appointment date must be in the future'
    );
  END IF;

  -- ③ Duration must match service configuration
  IF ROUND(EXTRACT(EPOCH FROM (p_appointment_end - p_appointment_start)) / 60.0) <> v_service_duration THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'invalid_duration',
      'message', 'Appointment duration does not match service configuration'
    );
  END IF;

  -- ④ Derive weekday in IST (0=Sun … 6=Sat, matching JS getDay())
  v_weekday := EXTRACT(DOW FROM (p_appointment_start AT TIME ZONE 'Asia/Kolkata'))::SMALLINT;

  -- ⑤ Clinic must be open on this weekday
  SELECT is_open, opening_time, closing_time
    INTO v_hours
    FROM clinic_hours
   WHERE weekday = v_weekday;

  IF NOT FOUND OR NOT v_hours.is_open THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'clinic_closed',
      'message', 'The clinic is closed on this day'
    );
  END IF;

  -- ⑥ Appointment must fall within opening hours
  IF (p_appointment_start AT TIME ZONE 'Asia/Kolkata')::TIME < v_hours.opening_time
  OR (p_appointment_end   AT TIME ZONE 'Asia/Kolkata')::TIME > v_hours.closing_time THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'outside_hours',
      'message', 'Appointment is outside clinic hours'
    );
  END IF;

  -- ⑦ Slot must not overlap a clinic break
  SELECT EXISTS (
    SELECT 1 FROM clinic_breaks
     WHERE weekday   = v_weekday
       AND is_active = TRUE
       AND start_time < (p_appointment_end   AT TIME ZONE 'Asia/Kolkata')::TIME
       AND end_time   > (p_appointment_start AT TIME ZONE 'Asia/Kolkata')::TIME
  ) INTO v_break_exists;

  IF v_break_exists THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'break_overlap',
      'message', 'This slot falls within a clinic break'
    );
  END IF;

  -- ⑧ Slot must not overlap a blocked period
  SELECT EXISTS (
    SELECT 1 FROM blocked_slots
     WHERE starts_at < p_appointment_end
       AND ends_at   > p_appointment_start
  ) INTO v_blocked_exists;

  IF v_blocked_exists THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'slot_blocked',
      'message', 'This time slot has been blocked by the clinic'
    );
  END IF;

  -- ⑨ Generate a unique booking reference (loop until collision-free)
  LOOP
    v_booking_ref := 'NPC-' || UPPER(
      SUBSTRING(REPLACE(uuid_generate_v4()::TEXT, '-', '') FROM 1 FOR 8)
    );
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM appointments WHERE booking_reference = v_booking_ref
    );
  END LOOP;

  -- ⑩ Insert — EXCLUDE constraint handles concurrent slot conflicts atomically
  BEGIN
    INSERT INTO appointments (
      booking_reference,
      service_id,
      service_name_snapshot,
      patient_name,
      patient_phone,
      patient_email,
      reason_for_visit,
      appointment_start,
      appointment_end,
      status
    ) VALUES (
      v_booking_ref,
      v_service_id,
      v_service_name,
      p_patient_name,
      p_patient_phone,
      NULLIF(p_patient_email, ''),
      NULLIF(p_reason_for_visit, ''),
      p_appointment_start,
      p_appointment_end,
      'pending'
    )
    RETURNING id INTO v_appointment_id;

  EXCEPTION WHEN exclusion_violation THEN
    RETURN json_build_object(
      'success', FALSE,
      'error',   'slot_taken',
      'message', 'This slot was just booked. Please choose another time.'
    );
  END;

  RETURN json_build_object(
    'success',            TRUE,
    'booking_reference',  v_booking_ref,
    'appointment_id',     v_appointment_id::TEXT,
    'status',             'pending'
  );

END;
$$;

-- Only service_role (our API) can call this function directly.
-- The anon/authenticated roles cannot call it.
REVOKE EXECUTE ON FUNCTION create_appointment FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION create_appointment TO service_role;
