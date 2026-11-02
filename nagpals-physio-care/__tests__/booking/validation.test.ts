/**
 * Unit tests for patient form validation (patientSchema).
 * Tests scenarios 1-3 from the Phase 4 test plan.
 */

import { describe, it, expect } from "vitest";
import { patientSchema } from "@/lib/booking/validation";

describe("patientSchema", () => {
  const valid = {
    fullName: "Rajesh Kumar",
    mobile: "9876543210",
    email: "",
    reasonForVisit: "",
    privacyConsent: true as const,
  };

  // ── Scenario 1: Successful submission ─────────────────────────
  it("accepts a fully valid patient record", () => {
    expect(() => patientSchema.parse(valid)).not.toThrow();
  });

  it("accepts a valid patient with optional email", () => {
    expect(() =>
      patientSchema.parse({ ...valid, email: "rajesh@example.com" })
    ).not.toThrow();
  });

  // ── Scenario 2: Invalid phone number ─────────────────────────
  it("rejects a mobile number that is too short", () => {
    const result = patientSchema.safeParse({ ...valid, mobile: "12345" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const mobileError = result.error.issues.find((i) =>
        i.path.includes("mobile")
      );
      expect(mobileError).toBeDefined();
    }
  });

  it("rejects a mobile number with letters", () => {
    const result = patientSchema.safeParse({ ...valid, mobile: "abcdefghij" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = patientSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) =>
        i.path.includes("email")
      );
      expect(emailError).toBeDefined();
    }
  });

  // ── Scenario 3: Missing required fields ───────────────────────
  it("rejects a missing fullName", () => {
    const result = patientSchema.safeParse({ ...valid, fullName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a fullName that is too short", () => {
    const result = patientSchema.safeParse({ ...valid, fullName: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects when privacyConsent is false", () => {
    const result = patientSchema.safeParse({ ...valid, privacyConsent: false });
    expect(result.success).toBe(false);
  });

  it("rejects when privacyConsent is missing", () => {
    const { privacyConsent: _, ...withoutConsent } = valid;
    const result = patientSchema.safeParse(withoutConsent);
    expect(result.success).toBe(false);
  });

  it("rejects reasonForVisit longer than 500 characters", () => {
    const result = patientSchema.safeParse({
      ...valid,
      reasonForVisit: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });
});
