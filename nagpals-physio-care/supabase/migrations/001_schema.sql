-- ============================================================
-- Nagpal's Physio Care — Database Schema
-- Run this migration first in a new Supabase project.
-- ============================================================

-- Required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS btree_gist;    -- needed for EXCLUDE constraint

-- ────────────────────────────────────────────────────────────
-- services
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT        NOT NULL,
  slug             TEXT        NOT NULL UNIQUE,
  description      TEXT,
  duration_minutes INTEGER     NOT NULL DEFAULT 30 CHECK (duration_minutes > 0),
  is_active        BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_services_slug   ON services(slug);
CREATE INDEX idx_services_active ON services(is_active);

-- ────────────────────────────────────────────────────────────
-- clinic_hours  (one row per weekday, 0 = Sunday … 6 = Saturday)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinic_hours (
  id           UUID     PRIMARY KEY DEFAULT uuid_generate_v4(),
  weekday      SMALLINT NOT NULL UNIQUE CHECK (weekday BETWEEN 0 AND 6),
  is_open      BOOLEAN  NOT NULL DEFAULT FALSE,
  opening_time TIME,
  closing_time TIME,
  CONSTRAINT chk_hours_when_open CHECK (
    is_open = FALSE
    OR (is_open = TRUE
        AND opening_time IS NOT NULL
        AND closing_time IS NOT NULL
        AND opening_time < closing_time)
  )
);

-- ────────────────────────────────────────────────────────────
-- clinic_breaks
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clinic_breaks (
  id         UUID     PRIMARY KEY DEFAULT uuid_generate_v4(),
  weekday    SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TIME     NOT NULL,
  end_time   TIME     NOT NULL,
  is_active  BOOLEAN  NOT NULL DEFAULT TRUE,
  CONSTRAINT chk_break_order CHECK (start_time < end_time)
);

CREATE INDEX idx_breaks_weekday ON clinic_breaks(weekday) WHERE is_active = TRUE;

-- ────────────────────────────────────────────────────────────
-- blocked_slots  (ad-hoc clinic closures, holidays, etc.)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blocked_slots (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  starts_at  TIMESTAMPTZ NOT NULL,
  ends_at    TIMESTAMPTZ NOT NULL,
  reason     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_blocked_order CHECK (starts_at < ends_at)
);

CREATE INDEX idx_blocked_range ON blocked_slots USING GIST (
  tstzrange(starts_at, ends_at, '[)')
);

-- ────────────────────────────────────────────────────────────
-- appointments
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id                   UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference    TEXT        NOT NULL UNIQUE,
  service_id           UUID        NOT NULL REFERENCES services(id),
  service_name_snapshot TEXT       NOT NULL,
  patient_name         TEXT        NOT NULL,
  patient_phone        TEXT        NOT NULL,
  patient_email        TEXT,
  reason_for_visit     TEXT,
  appointment_start    TIMESTAMPTZ NOT NULL,
  appointment_end      TIMESTAMPTZ NOT NULL,
  status               TEXT        NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_appt_order CHECK (appointment_start < appointment_end),
  -- Database-level overlap prevention for active appointments
  CONSTRAINT no_overlapping_bookings EXCLUDE USING GIST (
    tstzrange(appointment_start, appointment_end, '[)') WITH &&
  ) WHERE (status IN ('pending', 'confirmed'))
);

CREATE INDEX idx_appts_service   ON appointments(service_id);
CREATE INDEX idx_appts_start     ON appointments(appointment_start);
CREATE INDEX idx_appts_status    ON appointments(status);
CREATE INDEX idx_appts_reference ON appointments(booking_reference);
CREATE INDEX idx_appts_range     ON appointments USING GIST (
  tstzrange(appointment_start, appointment_end, '[)')
) WHERE status IN ('pending', 'confirmed');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER appointments_set_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ────────────────────────────────────────────────────────────
-- admin_profiles  (links Supabase Auth users to admin roles)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_profiles (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_auth_user ON admin_profiles(auth_user_id);
