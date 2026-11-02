import type { AppointmentStatus } from "@/types/admin";
import { STATUS_LABELS } from "@/types/admin";

const statusStyles: Record<AppointmentStatus, string> = {
  pending:   "bg-amber-50 text-amber-800 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  rejected:  "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
  completed: "bg-blue-50 text-blue-800 border-blue-200",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-sans font-semibold border tracking-wide ${statusStyles[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
