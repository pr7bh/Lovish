import type { Metadata } from "next";
import Link from "next/link";

export const instant = false;
import { ChevronLeft, ChevronRight } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AppointmentTable } from "@/components/admin/AppointmentTable";
import { AppointmentFilters } from "@/components/admin/AppointmentFilters";
import type { Appointment, AppointmentStatus } from "@/types/admin";

export const metadata: Metadata = {
  title: "Appointments — Admin",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 20;

interface SearchParams {
  status?: string;
  date?: string;
  q?: string;
  page?: string;
}

async function fetchAppointments(params: SearchParams) {
  const supabase = createAdminClient();
  const page = Math.max(1, parseInt(params.page ?? "1"));
  const offset = (page - 1) * PAGE_SIZE;

  let query = supabase
    .from("appointments")
    .select(
      `id, booking_reference, service_id, service_name_snapshot,
       patient_name, patient_phone, patient_email, reason_for_visit,
       appointment_start, appointment_end, status, admin_notes,
       created_at, updated_at, confirmed_at, rejected_at, cancelled_at, completed_at`,
      { count: "exact" }
    )
    .order("appointment_start", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  if (params.status) {
    query = query.eq("status", params.status);
  }
  if (params.date) {
    query = query
      .gte("appointment_start", `${params.date}T00:00:00+05:30`)
      .lte("appointment_start", `${params.date}T23:59:59+05:30`);
  }
  if (params.q) {
    query = query.or(
      `booking_reference.ilike.%${params.q}%,patient_name.ilike.%${params.q}%,patient_phone.ilike.%${params.q}%`
    );
  }

  const { data, count, error } = await query;
  if (error) return { appointments: [], total: 0 };

  const appointments: Appointment[] = (data ?? []).map((r) => ({
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
    status: r.status as AppointmentStatus,
    adminNotes: r.admin_notes,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    confirmedAt: r.confirmed_at,
    rejectedAt: r.rejected_at,
    cancelledAt: r.cancelled_at,
    completedAt: r.completed_at,
  }));

  return { appointments, total: count ?? 0 };
}

export default async function AppointmentsPage({
  searchParams,
}: PageProps<"/admin/appointments">) {
  await requireAdmin();
  const params = await searchParams;
  const page = Math.max(1, parseInt((params as SearchParams).page ?? "1"));
  const { appointments, total } = await fetchAppointments(params as SearchParams);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  function pageUrl(p: number) {
    const sp = new URLSearchParams();
    if ((params as SearchParams).status) sp.set("status", (params as SearchParams).status!);
    if ((params as SearchParams).date)   sp.set("date",   (params as SearchParams).date!);
    if ((params as SearchParams).q)      sp.set("q",      (params as SearchParams).q!);
    sp.set("page", String(p));
    return `?${sp.toString()}`;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="text-sm text-muted-text font-sans">{total} appointment{total !== 1 ? "s" : ""}</span>
        </div>
        <AppointmentFilters />
      </div>

      <div className="bg-white border border-beige rounded-sm">
        <AppointmentTable appointments={appointments} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm font-sans">
          <span className="text-muted-text">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={pageUrl(page - 1)} className="inline-flex items-center gap-1 h-8 px-3 border border-beige rounded-sm text-rich-black/70 hover:border-gold transition-colors">
                <ChevronLeft size={14} />
                Prev
              </Link>
            )}
            {page < totalPages && (
              <Link href={pageUrl(page + 1)} className="inline-flex items-center gap-1 h-8 px-3 border border-beige rounded-sm text-rich-black/70 hover:border-gold transition-colors">
                Next
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
