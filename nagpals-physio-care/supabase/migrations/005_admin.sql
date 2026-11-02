-- ============================================================
-- Phase 5: Admin Dashboard additions
-- ============================================================

-- Add 'completed' status and admin_notes column to appointments.
-- The existing EXCLUDE constraint covers pending/confirmed, so
-- completed/cancelled/rejected correctly release their slots.

ALTER TABLE appointments
  DROP CONSTRAINT IF EXISTS appointments_status_check;

ALTER TABLE appointments
  ADD CONSTRAINT appointments_status_check
  CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled', 'completed'));

ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Timestamps for status transitions (all nullable, set when transition occurs)
ALTER TABLE appointments
  ADD COLUMN IF NOT EXISTS confirmed_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejected_at   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS completed_at  TIMESTAMPTZ;

-- ── update_appointment_status ─────────────────────────────────
-- Atomic, validated status-change function.
-- Called by admin server actions (service_role key) only.
-- Enforces valid transition rules.

CREATE OR REPLACE FUNCTION update_appointment_status(
  p_appointment_id UUID,
  p_new_status     TEXT,
  p_admin_notes    TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_status TEXT;
  v_now            TIMESTAMPTZ := NOW();
BEGIN
  SELECT status INTO v_current_status
    FROM appointments
   WHERE id = p_appointment_id
   FOR UPDATE;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'error', 'not_found',
      'message', 'Appointment not found');
  END IF;

  -- Enforce transition rules
  IF v_current_status = 'pending' AND p_new_status NOT IN ('confirmed', 'rejected') THEN
    RETURN json_build_object('success', FALSE, 'error', 'invalid_transition',
      'message', 'Pending appointments can only be confirmed or rejected');
  END IF;

  IF v_current_status = 'confirmed' AND p_new_status NOT IN ('cancelled', 'completed') THEN
    RETURN json_build_object('success', FALSE, 'error', 'invalid_transition',
      'message', 'Confirmed appointments can only be cancelled or completed');
  END IF;

  IF v_current_status IN ('rejected', 'cancelled', 'completed') THEN
    RETURN json_build_object('success', FALSE, 'error', 'invalid_transition',
      'message', 'This appointment cannot be changed further');
  END IF;

  UPDATE appointments
     SET status       = p_new_status,
         admin_notes  = COALESCE(p_admin_notes, admin_notes),
         updated_at   = v_now,
         confirmed_at = CASE WHEN p_new_status = 'confirmed'  THEN v_now ELSE confirmed_at END,
         rejected_at  = CASE WHEN p_new_status = 'rejected'   THEN v_now ELSE rejected_at  END,
         cancelled_at = CASE WHEN p_new_status = 'cancelled'  THEN v_now ELSE cancelled_at END,
         completed_at = CASE WHEN p_new_status = 'completed'  THEN v_now ELSE completed_at END
   WHERE id = p_appointment_id;

  RETURN json_build_object('success', TRUE, 'status', p_new_status);
END;
$$;

REVOKE EXECUTE ON FUNCTION update_appointment_status FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION update_appointment_status TO service_role;

-- ── reschedule_appointment ────────────────────────────────────
-- Changes appointment_start / appointment_end.
-- The EXCLUDE constraint catches conflicts with other appointments.

CREATE OR REPLACE FUNCTION reschedule_appointment(
  p_appointment_id  UUID,
  p_new_start       TIMESTAMPTZ,
  p_new_end         TIMESTAMPTZ,
  p_admin_notes     TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status TEXT;
BEGIN
  SELECT status INTO v_status
    FROM appointments
   WHERE id = p_appointment_id
   FOR UPDATE;

  IF NOT FOUND THEN
    RETURN json_build_object('success', FALSE, 'error', 'not_found');
  END IF;

  IF v_status NOT IN ('pending', 'confirmed') THEN
    RETURN json_build_object('success', FALSE, 'error', 'invalid_state',
      'message', 'Only pending or confirmed appointments can be rescheduled');
  END IF;

  IF p_new_start <= NOW() THEN
    RETURN json_build_object('success', FALSE, 'error', 'past_date',
      'message', 'New appointment date must be in the future');
  END IF;

  UPDATE appointments
     SET appointment_start = p_new_start,
         appointment_end   = p_new_end,
         admin_notes       = COALESCE(p_admin_notes, admin_notes),
         updated_at        = NOW()
   WHERE id = p_appointment_id;

  RETURN json_build_object('success', TRUE);

EXCEPTION WHEN exclusion_violation THEN
  RETURN json_build_object('success', FALSE, 'error', 'slot_taken',
    'message', 'This time slot conflicts with an existing appointment');
END;
$$;

REVOKE EXECUTE ON FUNCTION reschedule_appointment FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION reschedule_appointment TO service_role;
