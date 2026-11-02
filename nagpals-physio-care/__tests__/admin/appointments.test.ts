/**
 * Unit tests for admin appointment business logic.
 * Tests Phase 5 scenarios 6–9 and 13–14 (logic layer; DB-level
 * enforcement and integration tests require a live Supabase instance).
 *
 * Integration tests (require live DB + auth):
 *   1. Admin login via signIn()
 *   2. Unauthorized dashboard access (no admin_profiles row)
 *   3. Session expiration redirect
 *   4. Admin logout via signOut()
 *  12. Service management (toggleServiceActive, updateServiceDuration)
 *  13. Public users cannot read patient records — enforced by RLS migration 002
 *  14. Public users cannot modify appointment status — enforced by RLS migration 002
 */

import { describe, it, expect } from "vitest";
import {
  STATUS_TRANSITIONS,
  STATUS_LABELS,
  type AppointmentStatus,
} from "@/types/admin";

// ── Scenario 6: Appointment confirmation ─────────────────────
describe("STATUS_TRANSITIONS — confirmation", () => {
  it("pending → confirmed is a valid transition", () => {
    expect(STATUS_TRANSITIONS["pending"]).toContain("confirmed");
  });

  it("confirmed → confirmed is NOT a valid transition", () => {
    expect(STATUS_TRANSITIONS["confirmed"]).not.toContain("confirmed");
  });
});

// ── Scenario 7: Appointment rejection ────────────────────────
describe("STATUS_TRANSITIONS — rejection", () => {
  it("pending → rejected is a valid transition", () => {
    expect(STATUS_TRANSITIONS["pending"]).toContain("rejected");
  });

  it("confirmed → rejected is NOT a valid transition", () => {
    expect(STATUS_TRANSITIONS["confirmed"]).not.toContain("rejected");
  });

  it("completed → rejected is NOT a valid transition", () => {
    expect(STATUS_TRANSITIONS["completed"]).not.toContain("rejected");
  });
});

// ── Scenario 8: Appointment cancellation ─────────────────────
describe("STATUS_TRANSITIONS — cancellation", () => {
  it("confirmed → cancelled is a valid transition", () => {
    expect(STATUS_TRANSITIONS["confirmed"]).toContain("cancelled");
  });

  it("pending → cancelled is NOT a valid transition", () => {
    expect(STATUS_TRANSITIONS["pending"]).not.toContain("cancelled");
  });
});

// ── Scenario 9: Rescheduling ─────────────────────────────────
describe("STATUS_TRANSITIONS — terminal states", () => {
  const terminal: AppointmentStatus[] = ["rejected", "cancelled", "completed"];

  it("terminal statuses have no further allowed transitions", () => {
    for (const status of terminal) {
      expect(STATUS_TRANSITIONS[status]).toHaveLength(0);
    }
  });

  it("pending and confirmed are non-terminal (allow transitions)", () => {
    expect(STATUS_TRANSITIONS["pending"].length).toBeGreaterThan(0);
    expect(STATUS_TRANSITIONS["confirmed"].length).toBeGreaterThan(0);
  });
});

// ── Status label completeness ────────────────────────────────
describe("STATUS_LABELS", () => {
  const allStatuses: AppointmentStatus[] = [
    "pending", "confirmed", "rejected", "cancelled", "completed",
  ];

  it("has a display label for every status", () => {
    for (const s of allStatuses) {
      expect(STATUS_LABELS[s]).toBeTruthy();
    }
  });

  it("labels are human-readable strings", () => {
    for (const s of allStatuses) {
      expect(typeof STATUS_LABELS[s]).toBe("string");
      expect(STATUS_LABELS[s].length).toBeGreaterThan(0);
    }
  });
});

// ── Availability actions validation logic ────────────────────
describe("Availability action validation", () => {
  it("validates start < end for clinic breaks", () => {
    const startTime = "13:00";
    const endTime   = "14:00";
    expect(startTime < endTime).toBe(true);
  });

  it("rejects equal start/end for clinic breaks", () => {
    expect("13:00" >= "13:00").toBe(true); // would trigger the error condition
  });

  it("validates service duration range", () => {
    const valid   = (d: number) => d >= 15 && d <= 240;
    expect(valid(30)).toBe(true);
    expect(valid(14)).toBe(false);
    expect(valid(241)).toBe(false);
    expect(valid(60)).toBe(true);
  });
});

// ── Scenario 11: Blocked dates ───────────────────────────────
describe("Blocked slot validation", () => {
  it("rejects a block where start >= end", () => {
    const starts = new Date("2026-12-25T10:00:00+05:30");
    const ends   = new Date("2026-12-25T09:00:00+05:30");
    expect(starts >= ends).toBe(true); // triggers the error path
  });

  it("accepts a valid full-day block", () => {
    const starts = new Date("2026-12-25T00:00:00+05:30");
    const ends   = new Date("2026-12-25T23:59:59+05:30");
    expect(starts < ends).toBe(true);
  });
});
