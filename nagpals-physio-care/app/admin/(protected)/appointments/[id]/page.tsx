import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const instant = false;
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Phone, Mail, FileText, Hash } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatusActions } from "@/components/admin/StatusActions";
import type { Appointment, AppointmentStatus } from "@/types/admin";

export const metadata: Metadata = {
  title: "Appointment Detail — Admin",
  robots: { index: false, follow: false },
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={15} className="text-gold shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest">{label}</p>
        <p className="text-sm font-sans text-rich-black mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default async function AppointmentDetailPage({
  params,
}: PageProps<"/admin/appointments/[id]">) {
  await requireAdmin();
  const { id } = await params;

  const supabase = createAdminClient();
  const { data: r } = await supabase
    .from("appointments")
    .select(`
      id, booking_reference, service_id, service_name_snapshot,
      patient_name, patient_phone, patient_email, reason_for_visit,
      appointment_start, appointment_end, status, admin_notes,
      created_at, updated_at, confirmed_at, rejected_at, cancelled_at, completed_at
    `)
    .eq("id", id)
    .single();

  if (!r) notFound();

  const appt: Appointment = {
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
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/appointments" className="text-muted-text hover:text-rich-black transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <span className="font-mono text-sm text-muted-text">{appt.bookingReference}</span>
        <StatusBadge status={appt.status} />
      </div>

      {/* Patient details */}
      <div className="bg-white border border-beige rounded-sm p-6">
        <h2 className="font-heading text-lg text-rich-black mb-5">Patient Information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <InfoRow icon={FileText} label="Full name" value={appt.patientName} />
          <InfoRow icon={Phone}    label="Phone"     value={appt.patientPhone} />
          {appt.patientEmail && (
            <InfoRow icon={Mail} label="Email" value={appt.patientEmail} />
          )}
          {appt.reasonForVisit && (
            <InfoRow icon={FileText} label="Reason for visit" value={appt.reasonForVisit} />
          )}
        </div>
      </div>

      {/* Appointment details */}
      <div className="bg-white border border-beige rounded-sm p-6">
        <h2 className="font-heading text-lg text-rich-black mb-5">Appointment Details</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <InfoRow icon={FileText} label="Service"    value={appt.serviceName} />
          <InfoRow icon={Calendar} label="Date & time" value={formatDateTime(appt.appointmentStart)} />
          <InfoRow icon={Clock}    label="Duration"   value={`${Math.round((new Date(appt.appointmentEnd).getTime() - new Date(appt.appointmentStart).getTime()) / 60000)} minutes`} />
          <InfoRow icon={Hash}     label="Created"    value={formatDateTime(appt.createdAt)} />
        </div>
      </div>

      {/* Status & actions */}
      <div className="bg-white border border-beige rounded-sm p-6">
        <h2 className="font-heading text-lg text-rich-black mb-5">Status Management</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-2">Current status</p>
            <StatusBadge status={appt.status} />
          </div>

          {appt.adminNotes && (
            <div>
              <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-1">Admin notes</p>
              <p className="text-sm font-sans text-rich-black/80 italic">{appt.adminNotes}</p>
            </div>
          )}

          <StatusActions appointmentId={appt.id} currentStatus={appt.status} />
        </div>
      </div>

      {/* Status history */}
      <div className="bg-white border border-beige rounded-sm p-6">
        <h2 className="font-heading text-lg text-rich-black mb-4">Timeline</h2>
        <div className="space-y-2 text-sm font-sans">
          {[
            { label: "Request received", time: appt.createdAt },
            { label: "Confirmed",        time: appt.confirmedAt },
            { label: "Rejected",         time: appt.rejectedAt },
            { label: "Cancelled",        time: appt.cancelledAt },
            { label: "Completed",        time: appt.completedAt },
          ]
            .filter((e) => e.time)
            .map((e) => (
              <div key={e.label} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                <span className="text-rich-black/70">{e.label}</span>
                <span className="ml-auto text-muted-text text-xs">
                  {formatDateTime(e.time!)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
