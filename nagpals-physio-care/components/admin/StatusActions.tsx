"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Ban, CheckSquare } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";
import { updateAppointmentStatus } from "@/lib/admin/actions/appointments";
import type { AppointmentStatus } from "@/types/admin";
import { STATUS_TRANSITIONS } from "@/types/admin";

interface Props {
  appointmentId: string;
  currentStatus: AppointmentStatus;
  onSuccess?: () => void;
}

const actionConfig = {
  confirmed: {
    label: "Confirm",
    icon: CheckCircle,
    variant: "primary" as const,
    description: "This will confirm the appointment. The patient's slot will be reserved.",
    confirmLabel: "Yes, confirm",
  },
  rejected: {
    label: "Reject",
    icon: XCircle,
    variant: "danger" as const,
    description: "This will reject the booking request. The slot will be released.",
    confirmLabel: "Yes, reject",
  },
  cancelled: {
    label: "Cancel",
    icon: Ban,
    variant: "danger" as const,
    description: "This will cancel the confirmed appointment. The slot will be released.",
    confirmLabel: "Yes, cancel",
  },
  completed: {
    label: "Mark completed",
    icon: CheckSquare,
    variant: "primary" as const,
    description: "Mark this appointment as completed.",
    confirmLabel: "Yes, mark completed",
  },
};

export function StatusActions({ appointmentId, currentStatus, onSuccess }: Props) {
  const [error, setError] = useState<string | null>(null);
  const allowed = STATUS_TRANSITIONS[currentStatus];

  if (allowed.length === 0) return null;

  async function handleAction(newStatus: AppointmentStatus) {
    setError(null);
    const result = await updateAppointmentStatus(appointmentId, newStatus);
    if (!result.success) {
      setError(result.error);
    } else {
      onSuccess?.();
    }
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-xs text-red-600 font-sans">{error}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {(allowed as AppointmentStatus[]).map((status) => {
          const cfg = actionConfig[status as keyof typeof actionConfig];
          if (!cfg) return null;
          const Icon = cfg.icon;
          return (
            <ConfirmDialog
              key={status}
              trigger={(open) => (
                <button
                  onClick={open}
                  className={`inline-flex items-center gap-1.5 h-8 px-3 text-xs font-sans font-medium rounded-sm transition-colors ${
                    cfg.variant === "danger"
                      ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                      : "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20"
                  }`}
                >
                  <Icon size={12} />
                  {cfg.label}
                </button>
              )}
              title={cfg.label}
              description={cfg.description}
              confirmLabel={cfg.confirmLabel}
              variant={cfg.variant}
              onConfirm={() => handleAction(status)}
            />
          );
        })}
      </div>
    </div>
  );
}
