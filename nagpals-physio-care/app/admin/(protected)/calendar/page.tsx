import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { createAdminClient } from "@/lib/supabase/admin";
import { CalendarView } from "@/components/admin/CalendarView";
import type { AppointmentStatus } from "@/types/admin";

export const metadata: Metadata = {
  title: "Calendar — Admin",
  robots: { index: false, follow: false },
};

export default async function CalendarPage() {
  await requireAdmin();

  const now = new Date();
  const year  = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  // Fetch the current month + adjacent months for smooth navigation
  const rangeStart = new Date(year, month - 1, 1).toISOString();
  const rangeEnd   = new Date(year, month + 2, 0).toISOString();

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("appointments")
    .select("id, booking_reference, patient_name, service_name_snapshot, appointment_start, status")
    .gte("appointment_start", rangeStart)
    .lte("appointment_start", rangeEnd)
    .order("appointment_start");

  const appointments = (data ?? []).map((r) => ({
    id: r.id,
    bookingReference: r.booking_reference,
    patientName: r.patient_name,
    serviceName: r.service_name_snapshot,
    appointmentStart: r.appointment_start,
    status: r.status as AppointmentStatus,
  }));

  return (
    <div>
      <p className="text-sm text-muted-text font-sans mb-5">
        All times in Asia/Kolkata (IST). Click a date to see that day&apos;s appointments.
      </p>
      <CalendarView
        appointments={appointments}
        initialYear={year}
        initialMonth={month}
      />
    </div>
  );
}
