/**
 * Unit tests for frontend availability helpers.
 * Tests scenarios 5–9 from the Phase 4 test plan (logic layer only;
 * database-level enforcement is tested against a real Supabase instance).
 */

import { describe, it, expect } from "vitest";
import {
  isWorkingDay,
  generateTimeSlots,
  formatBookingDate,
  getMaxBookingDate,
} from "@/lib/booking/availability";

// ── isWorkingDay ──────────────────────────────────────────────

describe("isWorkingDay", () => {
  // 2026-11-16 is a Monday
  const monday = "2026-11-16";
  // 2026-11-15 is a Sunday
  const sunday = "2026-11-15";
  // 2026-11-21 is a Saturday
  const saturday = "2026-11-21";

  it("returns true for a Monday when Mon–Sat are open", () => {
    expect(isWorkingDay(monday, [1, 2, 3, 4, 5, 6])).toBe(true);
  });

  it("returns true for a Saturday when Mon–Sat are open", () => {
    expect(isWorkingDay(saturday, [1, 2, 3, 4, 5, 6])).toBe(true);
  });

  // ── Scenario 6: Closed clinic day ───────────────────────────
  it("returns false for Sunday when clinic is closed on Sundays", () => {
    expect(isWorkingDay(sunday, [1, 2, 3, 4, 5, 6])).toBe(false);
  });

  it("returns false for Monday when only Tue–Fri are open", () => {
    expect(isWorkingDay(monday, [2, 3, 4, 5])).toBe(false);
  });

  it("falls back to BOOKING_CONFIG.workingDays when no override passed", () => {
    // Monday is in the default config (1–6)
    expect(isWorkingDay(monday)).toBe(true);
    expect(isWorkingDay(sunday)).toBe(false);
  });
});

// ── generateTimeSlots ─────────────────────────────────────────

describe("generateTimeSlots", () => {
  const date = "2026-11-16";
  const slots = generateTimeSlots(date);

  it("returns slots starting at 10:00", () => {
    expect(slots[0].time).toBe("10:00");
    expect(slots[0].display).toBe("10:00 AM");
  });

  it("last slot ends before 20:00", () => {
    const last = slots[slots.length - 1];
    const [h, m] = last.time.split(":").map(Number);
    expect(h * 60 + m + 30).toBeLessThanOrEqual(20 * 60);
  });

  // ── Scenario 7: Outside working hours ────────────────────────
  it("does not include a slot starting at 20:00 or later", () => {
    const late = slots.find((s) => s.time >= "20:00");
    expect(late).toBeUndefined();
  });

  it("marks all slots as available when no breaks or blocked slots are configured", () => {
    expect(slots.every((s) => s.available)).toBe(true);
  });

  it("produces 30-minute increments", () => {
    const [h0, m0] = slots[0].time.split(":").map(Number);
    const [h1, m1] = slots[1].time.split(":").map(Number);
    expect(h1 * 60 + m1 - (h0 * 60 + m0)).toBe(30);
  });
});

// ── getMaxBookingDate ─────────────────────────────────────────

describe("getMaxBookingDate", () => {
  it("returns a date 60 days in the future", () => {
    const today = "2026-11-16";
    const max = getMaxBookingDate(today);
    const diff =
      (new Date(max).getTime() - new Date(today).getTime()) /
      (1000 * 60 * 60 * 24);
    expect(diff).toBe(60);
  });
});

// ── formatBookingDate ─────────────────────────────────────────

describe("formatBookingDate", () => {
  it("formats a date string into a human-readable string", () => {
    const formatted = formatBookingDate("2026-11-16");
    expect(formatted).toContain("2026");
    expect(formatted.length).toBeGreaterThan(5);
  });
});
