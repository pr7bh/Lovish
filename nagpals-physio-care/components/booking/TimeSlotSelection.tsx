"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "cn";
import type { TimeSlot } from "@/types/booking";
import { formatBookingDate } from "@/lib/booking/availability";

interface Props {
  date: string;
  serviceSlug: string;
  selected: string | null;
  onSelect: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function groupSlots(slots: TimeSlot[]) {
  return {
    morning: slots.filter((s) => parseInt(s.time) < 13),
    afternoon: slots.filter((s) => {
      const h = parseInt(s.time);
      return h >= 13 && h < 17;
    }),
    evening: slots.filter((s) => parseInt(s.time) >= 17),
  };
}

function SlotGroup({
  title,
  slots,
  selected,
  onSelect,
}: {
  title: string;
  slots: TimeSlot[];
  selected: string | null;
  onSelect: (time: string) => void;
}) {
  if (slots.length === 0) return null;
  const hasAvailable = slots.some((s) => s.available);

  return (
    <div className="mb-6">
      <p className="text-xs font-sans font-semibold text-muted-text uppercase tracking-widest mb-3">
        {title}
      </p>
      {!hasAvailable ? (
        <p className="text-sm text-muted-text italic">No slots available</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && onSelect(slot.time)}
              disabled={!slot.available}
              aria-pressed={selected === slot.time}
              className={cn(
                "h-10 px-4 rounded-sm text-sm font-sans font-medium transition-all duration-150 border",
                !slot.available
                  ? "border-beige text-muted-text/40 cursor-not-allowed bg-warm-white/50 line-through"
                  : selected === slot.time
                  ? "border-gold bg-gold text-white shadow-sm"
                  : "border-beige bg-warm-white text-rich-black hover:border-gold/50 hover:bg-gold/5 cursor-pointer"
              )}
            >
              {slot.display}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TimeSlotSelection({
  date,
  serviceSlug,
  selected,
  onSelect,
  onNext,
  onBack,
}: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchError(false);

    fetch(
      `/api/availability?date=${encodeURIComponent(date)}&serviceSlug=${encodeURIComponent(serviceSlug)}`
    )
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: { slots?: TimeSlot[] }) => {
        setSlots(data.slots ?? []);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, [date, serviceSlug]);

  const { morning, afternoon, evening } = groupSlots(slots);

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-1">
        Choose a Time
      </h2>
      <p className="text-sm text-gold/80 font-sans mb-6">
        {formatBookingDate(date)}
      </p>
      <p className="text-sm text-muted-text mb-8 max-w-lg">
        Select your preferred appointment time. All times are in Indian Standard
        Time (IST). Available slots reflect live clinic availability.
      </p>

      <div className="bg-warm-white border border-beige rounded-sm p-5 md:p-7 min-h-[180px]">
        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-muted-text">
            <Loader2 size={18} className="animate-spin text-gold" />
            <span className="text-sm">Loading availability…</span>
          </div>
        ) : fetchError ? (
          <div className="text-center py-10">
            <p className="text-sm text-muted-text mb-3">
              Unable to load availability right now.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setFetchError(false);
                fetch(
                  `/api/availability?date=${encodeURIComponent(date)}&serviceSlug=${encodeURIComponent(serviceSlug)}`
                )
                  .then((r) => r.json())
                  .then((data: { slots?: TimeSlot[] }) => {
                    setSlots(data.slots ?? []);
                    setLoading(false);
                  })
                  .catch(() => {
                    setFetchError(true);
                    setLoading(false);
                  });
              }}
              className="text-sm text-gold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        ) : slots.length === 0 ? (
          <p className="text-sm text-muted-text py-6 text-center">
            No available slots for this date.
          </p>
        ) : (
          <>
            <SlotGroup
              title="Morning"
              slots={morning}
              selected={selected}
              onSelect={onSelect}
            />
            <SlotGroup
              title="Afternoon"
              slots={afternoon}
              selected={selected}
              onSelect={onSelect}
            />
            <SlotGroup
              title="Evening"
              slots={evening}
              selected={selected}
              onSelect={onSelect}
            />
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-11 px-6 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="h-11 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
