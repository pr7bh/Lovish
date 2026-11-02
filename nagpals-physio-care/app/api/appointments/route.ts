import { NextResponse } from "next/server";
import { connection } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

// ── Input schema (re-validated server-side, never trust client) ──
const appointmentBodySchema = z.object({
  serviceSlug: z.string().min(1, "Service is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  timeSlot: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "timeSlot must be HH:MM"),
  patient: z.object({
    fullName: z.string().min(2).max(100),
    mobile: z
      .string()
      .min(7)
      .max(20)
      .regex(/^[+\d\s\-()\.\*]{7,20}$/),
    email: z.string().refine(
      (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      { message: "Invalid email address" }
    ),
    reasonForVisit: z.string().max(500),
    privacyConsent: z.literal(true),
  }),
});

// Human-readable messages for each database-level error code
const DB_ERROR_MESSAGES: Record<string, string> = {
  service_inactive: "The selected service is not currently available.",
  past_date: "Please select a future appointment date.",
  invalid_duration: "Invalid appointment slot. Please try again.",
  clinic_closed: "The clinic is closed on this day.",
  outside_hours: "This time is outside clinic hours.",
  break_overlap: "This time slot falls within a clinic break.",
  slot_blocked: "This slot has been blocked by the clinic.",
  slot_taken: "This slot was just booked. Please choose another time.",
};

export async function POST(request: Request) {
  await connection();
  // Parse body
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate input
  const parsed = appointmentBodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Validation failed", errors: parsed.error.issues },
      { status: 422 }
    );
  }

  const { serviceSlug, date, timeSlot, patient } = parsed.data;
  const supabase = createAdminClient();

  // Fetch service to get duration_minutes
  const { data: service, error: svcError } = await supabase
    .from("services")
    .select("id, name, duration_minutes")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  if (svcError || !service) {
    return NextResponse.json(
      { success: false, message: "Selected service is not available." },
      { status: 400 }
    );
  }

  // Build TIMESTAMPTZ strings from IST date + time
  const appointmentStart = `${date}T${timeSlot}:00+05:30`;
  const [h, m] = timeSlot.split(":").map(Number);
  const endTotalMin = h * 60 + m + service.duration_minutes;
  const endH = Math.floor(endTotalMin / 60);
  const endM = endTotalMin % 60;
  const appointmentEnd = `${date}T${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}:00+05:30`;

  // Call atomic PostgreSQL function
  const { data: result, error: rpcError } = await supabase.rpc(
    "create_appointment",
    {
      p_service_slug:      serviceSlug,
      p_patient_name:      patient.fullName,
      p_patient_phone:     patient.mobile,
      p_patient_email:     patient.email || "",
      p_reason_for_visit:  patient.reasonForVisit || "",
      p_appointment_start: appointmentStart,
      p_appointment_end:   appointmentEnd,
    }
  );

  if (rpcError) {
    console.error("[POST /api/appointments] RPC error:", rpcError.message);
    return NextResponse.json(
      { success: false, message: "Unable to process your request. Please try again." },
      { status: 500 }
    );
  }

  if (!result?.success) {
    const errorCode = result?.error as string | undefined;
    const message =
      (errorCode && DB_ERROR_MESSAGES[errorCode]) ??
      result?.message ??
      "This time slot is not available.";
    return NextResponse.json({ success: false, message }, { status: 409 });
  }

  return NextResponse.json(
    {
      success: true,
      bookingReference: result.booking_reference as string,
      status: "pending",
    },
    { status: 201 }
  );
}
