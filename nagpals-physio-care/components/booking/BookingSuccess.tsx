"use client";

import Link from "next/link";
import { CheckCircle, Clock, Phone } from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import { formatBookingDate } from "@/lib/booking/availability";

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}

interface Props {
  requestId: string;
  service: ServiceData;
  date: string;
  timeSlot: string;
  onNewBooking: () => void;
}

export default function BookingSuccess({
  requestId,
  service,
  date,
  timeSlot,
  onNewBooking,
}: Props) {
  const Icon = service.icon;

  return (
    <div className="text-center py-8">
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle size={36} className="text-gold" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-3">
        Your appointment request has been received.
      </h2>

      {/* PENDING CONFIRMATION notice */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full mb-6">
        <Clock size={14} className="text-amber-600 shrink-0" />
        <span className="text-sm font-sans font-semibold text-amber-800 uppercase tracking-wide">
          Pending Confirmation
        </span>
      </div>

      <p className="text-sm text-muted-text max-w-md mx-auto mb-8 leading-relaxed">
        Your appointment is{" "}
        <strong>pending confirmation from Nagpal&apos;s Physio Care</strong>.
        The clinic will review your request and contact you shortly to confirm
        the date and time.
      </p>

      {/* Summary card */}
      <div className="bg-warm-white border border-beige rounded-sm p-6 max-w-sm mx-auto text-left mb-8">
        <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-4">
          Request Summary
        </p>
        <dl className="space-y-3">
          <div className="flex items-center gap-2">
            <Icon size={15} className="text-gold shrink-0" />
            <span className="text-sm text-rich-black">{service.title}</span>
          </div>
          <div className="text-sm text-rich-black">
            <span className="text-muted-text">Date: </span>
            {formatBookingDate(date)}
          </div>
          <div className="text-sm text-rich-black">
            <span className="text-muted-text">Time: </span>
            {formatTime(timeSlot)} IST
          </div>
          <div className="text-sm font-mono text-rich-black/60 pt-1 border-t border-beige">
            Request ID: {requestId}
          </div>
        </dl>
      </div>

      {/* What happens next */}
      <div className="bg-ivory border border-beige rounded-sm p-5 max-w-sm mx-auto text-left mb-8">
        <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-3">
          What Happens Next
        </p>
        <ol className="space-y-2">
          {[
            "The clinic reviews your request (typically within 24 hours)",
            "A team member contacts you to confirm the appointment",
            "You receive confirmation with any preparation instructions",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-rich-black/70">
              <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center text-xs text-gold font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Contact for urgent */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-text mb-8">
        <Phone size={14} className="text-gold" />
        <span>
          Urgent?{" "}
          <Link href="/contact" className="text-gold hover:underline underline-offset-2">
            Contact the clinic directly
          </Link>
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onNewBooking}
          className="h-11 px-7 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
        >
          Make Another Request
        </button>
        <Link
          href="/"
          className="h-11 px-7 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200 flex items-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
