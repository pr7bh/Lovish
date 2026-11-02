import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { createAdminClient } from "@/lib/supabase/admin";
import { MetricCard } from "@/components/admin/MetricCard";
import { AppointmentTable } from "@/components/admin/AppointmentTable";
import type { Appointment, DashboardMetrics } from "@/types/admin";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
  robots: { index: false, follow: false },
};

async function getMetrics(): Promise<DashboardMetrics> {
  const supabase = createAdminClient();
  const now = new Date();

  const istOffset = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(now.getTime() + istOffset);
  const todayStr = istNow.toISOString().slice(0, 10);
  const todayStart = `${todayStr}T00:00:00+05:30`;
  const todayEnd   = `${todayStr}T23:59:59+05:30`;

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  const weekStartStr = weekStart.toISOString().slice(0, 10);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  const weekEndStr = weekEnd.toISOString().slice(0, 10);

  const [todayRes, pendingRes, confirmedRes, completedRes, upcomingRes, weeklyRes] =
    await Promise.all([
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .gte("appointment_start", todayStart).lte("appointment_start", todayEnd),
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .eq("status", "confirmed"),
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .eq("status", "completed"),
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .in("status", ["pending", "confirmed"])
        .gt("appointment_start", now.toISOString()),
      supabase.from("appointments").select("id", { count: "exact", head: true })
        .gte("appointment_start", `${weekStartStr}T00:00:00+05:30`)
        .lt("appointment_start", `${weekEndStr}T00:00:00+05:30`),
    ]);

  return {
    todayCount:     todayRes.count ?? 0,
    pendingCount:   pendingRes.count ?? 0,
    confirmedCount: confirmedRes.count ?? 0,
    completedCount: completedRes.count ?? 0,
    upcomingCount:  upcomingRes.count ?? 0,
    weeklyCount:    weeklyRes.count ?? 0,
  };
}

async function getRecentAppointments(): Promise<Appointment[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("appointments")
    .select(`
      id, booking_reference, service_id, service_name_snapshot,
      patient_name, patient_phone, patient_email,
      reason_for_visit, appointment_start, appointment_end,
      status, admin_notes, created_at, updated_at,
      confirmed_at, rejected_at, cancelled_at, completed_at
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  return (data ?? []).map((r) => ({
    id: r.id,
    bookingReference: r.booking_reference,
    serviceId: r.service_id,
    serviceName: r.service_name_snapshot,
    patientName: r.patient_name,
    patientPhone: r.patient_phone,
    patientEmail: r.patient_email,
    reasonForVisit: r.reason_for_visit,
    appointmentStart: r.appointment_start,
    appointmentEnd: r.appointment_end,
    status: r.status,
    adminNotes: r.admin_notes,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    confirmedAt: r.confirmed_at,
    rejectedAt: r.rejected_at,
    cancelledAt: r.cancelled_at,
    completedAt: r.completed_at,
  }));
}

export default async function DashboardPage() {
  await requireAdmin();
  const [metrics, recent] = await Promise.all([getMetrics(), getRecentAppointments()]);

  return (
    <div className="space-y-7">
      <div>
        <h2 className="font-heading text-2xl text-rich-black mb-1">Overview</h2>
        <p className="text-sm text-muted-text font-sans">Real-time clinic metrics — Asia/Kolkata timezone</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard title="Today" value={metrics.todayCount} subtitle="appointments" />
        <MetricCard title="Pending" value={metrics.pendingCount} subtitle="awaiting confirmation" accent />
        <MetricCard title="Confirmed" value={metrics.confirmedCount} subtitle="upcoming" />
        <MetricCard title="Completed" value={metrics.completedCount} subtitle="all time" />
        <MetricCard title="Upcoming" value={metrics.upcomingCount} subtitle="active bookings" />
        <MetricCard title="This week" value={metrics.weeklyCount} subtitle="total requests" />
      </div>

      {/* Recent appointments */}
      <div className="bg-white border border-beige rounded-sm">
        <div className="px-5 py-4 border-b border-beige">
          <h3 className="font-heading text-lg text-rich-black">Recent Requests</h3>
        </div>
        <AppointmentTable appointments={recent} />
      </div>
    </div>
  );
}
