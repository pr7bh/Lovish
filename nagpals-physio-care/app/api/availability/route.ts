import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { BOOKING_CONFIG } from "@/lib/booking/booking-config";
import type { TimeSlot } from "@/types/booking";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  serviceSlug: z.string().min(1),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsed = querySchema.safeParse({
    date: searchParams.get("date"),
    serviceSlug: searchParams.get("serviceSlug"),
  });

  if (!parsed.success) {
    return NextResponse.json({ slots: [] }, { status: 400 });
  }

  const { date, serviceSlug } = parsed.data;
  const supabase = createAdminClient();

  // Weekday for this date (0 = Sunday … 6 = Saturday, matching JS getDay)
  const [y, mo, d] = date.split("-").map(Number);
  const weekday = new Date(y, mo - 1, d).getDay();

  // Clinic hours for this weekday
  const { data: hours } = await supabase
    .from("clinic_hours")
    .select("is_open, opening_time, closing_time")
    .eq("weekday", weekday)
    .single();

  if (!hours || !hours.is_open || !hours.opening_time || !hours.closing_time) {
    return NextResponse.json({ slots: [] });
  }

  // Service duration
  const { data: service } = await supabase
    .from("services")
    .select("duration_minutes")
    .eq("slug", serviceSlug)
    .eq("is_active", true)
    .single();

  const slotDuration =
    service?.duration_minutes ?? BOOKING_CONFIG.slotDurationMinutes;

  // Clinic breaks for this weekday
  const { data: breaks } = await supabase
    .from("clinic_breaks")
    .select("start_time, end_time")
    .eq("weekday", weekday)
    .eq("is_active", true);

  // Blocked slots overlapping this date
  const dayStart = `${date}T00:00:00+05:30`;
  const dayEnd = `${date}T23:59:59+05:30`;

  const { data: blockedSlots } = await supabase
    .from("blocked_slots")
    .select("starts_at, ends_at")
    .lt("starts_at", dayEnd)
    .gt("ends_at", dayStart);

  // Existing pending/confirmed appointments on this date
  const { data: existingAppts } = await supabase
    .from("appointments")
    .select("appointment_start, appointment_end")
    .in("status", ["pending", "confirmed"])
    .lt("appointment_start", dayEnd)
    .gt("appointment_end", dayStart);

  // Build time helpers
  function toMinutes(timeStr: string): number {
    const [hh, mm] = timeStr.split(":").map(Number);
    return hh * 60 + mm;
  }

  const openingMin = toMinutes(hours.opening_time);
  const closingMin = toMinutes(hours.closing_time);

  const slots: TimeSlot[] = [];
  let cursor = openingMin;

  while (cursor + slotDuration <= closingMin) {
    const hh = Math.floor(cursor / 60);
    const mm = cursor % 60;
    const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    const slotEndMin = cursor + slotDuration;

    const slotStartISO = `${date}T${timeStr}:00+05:30`;
    const slotEndISO = `${date}T${String(Math.floor(slotEndMin / 60)).padStart(2, "0")}:${String(slotEndMin % 60).padStart(2, "0")}:00+05:30`;

    // In a clinic break?
    const inBreak = (breaks ?? []).some((br) => {
      const brStart = toMinutes(br.start_time);
      const brEnd = toMinutes(br.end_time);
      return cursor < brEnd && slotEndMin > brStart;
    });

    // In a blocked slot?
    const isBlocked = (blockedSlots ?? []).some(
      (bs) =>
        new Date(bs.starts_at) < new Date(slotEndISO) &&
        new Date(bs.ends_at) > new Date(slotStartISO)
    );

    // Already booked?
    const isBooked = (existingAppts ?? []).some(
      (appt) =>
        new Date(appt.appointment_start) < new Date(slotEndISO) &&
        new Date(appt.appointment_end) > new Date(slotStartISO)
    );

    const period = hh < 12 ? "AM" : "PM";
    const displayH = hh % 12 || 12;
    const display = `${displayH}:${String(mm).padStart(2, "0")} ${period}`;

    slots.push({ time: timeStr, display, available: !inBreak && !isBlocked && !isBooked });
    cursor += slotDuration;
  }

  return NextResponse.json({ slots });
}
