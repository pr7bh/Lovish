import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { Appointment } from "@/types/admin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

interface Props {
  appointments: Appointment[];
}

export function AppointmentTable({ appointments }: Props) {
  if (appointments.length === 0) {
    return (
      <div className="py-16 text-center text-muted-text font-sans text-sm">
        No appointments match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-sans">
        <thead>
          <tr className="border-b border-beige">
            {["Reference", "Patient", "Service", "Date & Time", "Status", ""].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-text uppercase tracking-widest whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id} className="border-b border-beige/60 hover:bg-ivory/40 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-rich-black/60 whitespace-nowrap">
                {appt.bookingReference}
              </td>
              <td className="px-4 py-3">
                <p className="text-rich-black font-medium">{appt.patientName}</p>
                <p className="text-xs text-muted-text">{appt.patientPhone}</p>
              </td>
              <td className="px-4 py-3 text-rich-black/80 whitespace-nowrap">
                {appt.serviceName}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <p className="text-rich-black">{formatDate(appt.appointmentStart)}</p>
                <p className="text-xs text-muted-text">{formatTime(appt.appointmentStart)}</p>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={appt.status} />
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/appointments/${appt.id}`}
                  className="text-gold hover:text-gold-light transition-colors"
                  aria-label={`View appointment ${appt.bookingReference}`}
                >
                  <ChevronRight size={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
