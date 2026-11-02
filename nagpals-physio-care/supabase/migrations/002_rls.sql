-- ============================================================
-- Row Level Security Policies
-- Public visitors: read-only on config tables, no access to appointments.
-- Admins: full access via service-role key (bypasses RLS entirely).
-- ============================================================

-- ── services ─────────────────────────────────────────────────
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = TRUE);

-- ── clinic_hours ──────────────────────────────────────────────
ALTER TABLE clinic_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read clinic hours"
  ON clinic_hours FOR SELECT
  USING (TRUE);

-- ── clinic_breaks ─────────────────────────────────────────────
ALTER TABLE clinic_breaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read clinic breaks"
  ON clinic_breaks FOR SELECT
  USING (TRUE);

-- ── blocked_slots ─────────────────────────────────────────────
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blocked slots"
  ON blocked_slots FOR SELECT
  USING (TRUE);

-- ── appointments ──────────────────────────────────────────────
-- No public access.  All writes go through the API (service-role key).
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public read on appointments"
  ON appointments FOR SELECT
  USING (FALSE);

CREATE POLICY "No public insert on appointments"
  ON appointments FOR INSERT
  WITH CHECK (FALSE);

CREATE POLICY "No public update on appointments"
  ON appointments FOR UPDATE
  USING (FALSE);

CREATE POLICY "No public delete on appointments"
  ON appointments FOR DELETE
  USING (FALSE);

-- ── admin_profiles ────────────────────────────────────────────
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admins can only see their own profile row via the anon client
CREATE POLICY "Admin sees own profile"
  ON admin_profiles FOR SELECT
  USING (auth_user_id = auth.uid());
