"use client";

import { Pencil, Loader2 } from "lucide-react";
import { cn } from "cn";
import type { ServiceData } from "@/lib/services-data";
import type { PatientDetails, BookingStep } from "@/types/booking";
import { formatBookingDate } from "@/lib/booking/availability";

interface Props {
  service: ServiceData;
  date: string;
  timeSlot: string;
  patient: PatientDetails;
  onConfirm: () => void;
  onEdit: (step: BookingStep) => void;
  submitting: boolean;
  error: string | null;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-beige/60 last:border-0">
      <div className="min-w-0">
        <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-1">
          {label}
        </p>
        <div className="text-sm text-rich-black font-sans">{value}</div>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light font-sans shrink-0 mt-1 transition-colors"
      >
        <Pencil size={11} />
        Edit
      </button>
    </div>
  );
}

export default function BookingReview({
  service,
  date,
  timeSlot,
  patient,
  onConfirm,
  onEdit,
  submitting,
  error,
}: Props) {
  const Icon = service.icon;

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-2">
        Review Your Booking
      </h2>
      <p className="text-sm text-muted-text mb-8 max-w-lg">
        Please review your details below. Once submitted, the clinic will review
        your request and confirm the appointment.
      </p>

      {/* Review card */}
      <div className="bg-warm-white border border-beige rounded-sm p-6 md:p-8 divide-y divide-beige/40">
        <ReviewRow
          label="Service"
          value={
            <span className="flex items-center gap-2">
              <Icon size={15} className="text-gold shrink-0" />
              {service.title}
            </span>
          }
          onEdit={() => onEdit(1)}
        />
        <ReviewRow
          label="Date"
          value={formatBookingDate(date)}
          onEdit={() => onEdit(2)}
        />
        <ReviewRow
          label="Time"
          value={`${formatTime(timeSlot)} IST`}
          onEdit={() => onEdit(3)}
        />
        <ReviewRow
          label="Patient Details"
          value={
            <span className="space-y-0.5 block">
              <span className="block font-medium">{patient.fullName}</span>
              <span className="block text-muted-text">{patient.mobile}</span>
              {patient.email && (
                <span className="block text-muted-text">{patient.email}</span>
              )}
              {patient.reasonForVisit && (
                <span className="block text-muted-text italic mt-1">
                  &ldquo;{patient.reasonForVisit}&rdquo;
                </span>
              )}
            </span>
          }
          onEdit={() => onEdit(4)}
        />
      </div>

      {/* Pending notice */}
      <div className="mt-5 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-sm">
        <span className="text-amber-600 text-lg leading-none shrink-0 mt-0.5">ℹ</span>
        <p className="text-sm text-amber-800">
          <strong>This is a booking request, not a confirmed appointment.</strong>{" "}
          The clinic will review your request and contact you to confirm the
          appointment and discuss any details.
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => onEdit(4)}
          disabled={submitting}
          className="h-11 px-6 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold disabled:opacity-40 transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          disabled={submitting}
          className={cn(
            "h-11 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light disabled:opacity-60 transition-colors duration-200 flex items-center gap-2"
          )}
        >
          {submitting && <Loader2 size={15} className="animate-spin" />}
          {submitting ? "Submitting…" : "Submit Booking Request"}
        </button>
      </div>
    </div>
  );
}
