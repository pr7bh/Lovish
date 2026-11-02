-- ============================================================
-- Seed data — default clinic schedule and services.
-- Run after 001_schema.sql, 002_rls.sql, 003_functions.sql.
-- Safe to re-run (ON CONFLICT DO NOTHING).
--
-- NOTE: Monday–Saturday is provisional. Update clinic_hours
-- rows directly in Supabase when the confirmed schedule is known.
-- ============================================================

-- Default clinic hours: Mon–Sat 10 AM – 8 PM, Sunday closed.
INSERT INTO clinic_hours (weekday, is_open, opening_time, closing_time) VALUES
  (0, FALSE, NULL,       NULL),         -- Sunday:    closed
  (1, TRUE,  '10:00:00', '20:00:00'),   -- Monday:    10 AM – 8 PM
  (2, TRUE,  '10:00:00', '20:00:00'),   -- Tuesday
  (3, TRUE,  '10:00:00', '20:00:00'),   -- Wednesday
  (4, TRUE,  '10:00:00', '20:00:00'),   -- Thursday
  (5, TRUE,  '10:00:00', '20:00:00'),   -- Friday
  (6, TRUE,  '10:00:00', '20:00:00')    -- Saturday
ON CONFLICT (weekday) DO NOTHING;

-- Services — slugs must match lib/services-data.ts exactly.
INSERT INTO services (name, slug, description, duration_minutes, is_active) VALUES
  ('Sports Physiotherapy',       'sports-physiotherapy',       'Specialized assessment and rehabilitation for sports injuries.', 30, TRUE),
  ('Orthopedic Physiotherapy',   'orthopedic-physiotherapy',   'Assessment and rehabilitation of musculoskeletal conditions.',   30, TRUE),
  ('Neurological Rehabilitation','neurological-rehabilitation', 'Rehabilitation for conditions affecting the nervous system.',    30, TRUE),
  ('Women''s Health Physiotherapy','womens-health',             'Physiotherapy for women''s health and pelvic floor concerns.',  30, TRUE),
  ('Pediatric Rehabilitation',   'pediatric-rehabilitation',   'Developmental and rehabilitation physiotherapy for children.',  30, TRUE),
  ('Dry Needling',               'dry-needling',               'Trigger-point therapy using fine needles.',                     30, TRUE),
  ('Cupping Therapy',            'cupping-therapy',            'Myofascial decompression for pain and mobility.',               30, TRUE),
  ('IASTM',                      'iastm',                      'Instrument-assisted soft tissue mobilization.',                 30, TRUE)
ON CONFLICT (slug) DO NOTHING;
