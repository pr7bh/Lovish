"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import {
  getTodayIST,
  getMaxBookingDate,
  isWorkingDay,
} from "@/lib/booking/availability";
import { BOOKING_CONFIG } from "@/lib/booking/booking-config";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  selected: string | null;
  onSelect: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DateSelection({ selected, onSelect, onNext, onBack }: Props) {
  const [todayIST, setTodayIST] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [viewYear, setViewYear] = useState(0);
  const [viewMonth, setViewMonth] = useState(0);
  // Open weekdays from the database; null = not yet loaded (fall back to config)
  const [openWeekdays, setOpenWeekdays] = useState<number[] | null>(null);

  useEffect(() => {
    const today = getTodayIST();
    const max = getMaxBookingDate(today);
    setTodayIST(today);
    setMaxDate(max);
    const [y, m] = today.split("-").map(Number);
    setViewYear(y);
    setViewMonth(m - 1);

    // Fetch configurable open days from the database
    fetch("/api/availability/open-days")
      .then((r) => r.json())
      .then((data: { openWeekdays?: number[] }) => {
        if (Array.isArray(data.openWeekdays)) setOpenWeekdays(data.openWeekdays);
      })
      .catch(() => {
        // Silently fall back to BOOKING_CONFIG.workingDays
        setOpenWeekdays(BOOKING_CONFIG.workingDays as number[]);
      });
  }, []);

  if (!todayIST) return null;

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const offset = (firstDayOfMonth + 6) % 7; // Monday-first
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function dateStr(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function isCellDisabled(day: number) {
    const d = dateStr(day);
    // Pass the DB-loaded weekdays (or undefined to fall back to config)
    return (
      d < todayIST ||
      d > maxDate ||
      !isWorkingDay(d, openWeekdays ?? undefined)
    );
  }

  const [todayY, todayM] = todayIST.split("-").map(Number);
  const [maxY, maxM] = maxDate.split("-").map(Number);
  const canGoPrev =
    viewYear > todayY || (viewYear === todayY && viewMonth > todayM - 1);
  const canGoNext =
    viewYear < maxY || (viewYear === maxY && viewMonth < maxM - 1);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-2">
        Choose a Date
      </h2>
      <p className="text-sm text-muted-text mb-8 max-w-lg">
        Select your preferred appointment date. Only available working days are
        selectable.
      </p>

      <div className="bg-warm-white border border-beige rounded-sm p-5 md:p-7 max-w-md">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="p-2 rounded-sm text-rich-black/60 hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <p className="font-heading text-lg text-rich-black">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <button
            onClick={nextMonth}
            disabled={!canGoNext}
            className="p-2 rounded-sm text-rich-black/60 hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1.5">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-center text-[11px] font-sans font-medium text-muted-text py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} className="aspect-square" />;
            const d = dateStr(day);
            const disabled = isCellDisabled(day);
            const isSelected = d === selected;
            const isToday = d === todayIST;

            return (
              <button
                key={d}
                onClick={() => !disabled && onSelect(d)}
                disabled={disabled}
                aria-label={d}
                aria-pressed={isSelected}
                className={cn(
                  "aspect-square flex items-center justify-center text-sm font-sans rounded-sm transition-all duration-150",
                  disabled
                    ? "text-rich-black/20 cursor-not-allowed"
                    : "hover:bg-gold/15 cursor-pointer",
                  isSelected && "!bg-gold text-white font-medium shadow-sm",
                  isToday && !isSelected && "border border-gold/50 text-gold font-medium",
                  !isSelected && !isToday && !disabled && "text-rich-black"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center flex-wrap gap-4 text-xs text-muted-text">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gold" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-gold/50" />
          Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-rich-black/10" />
          Unavailable
        </span>
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
