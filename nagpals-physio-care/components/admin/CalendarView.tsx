"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AppointmentStatus } from "@/types/admin";

interface CalendarAppt {
  id: string;
  bookingReference: string;
  patientName: string;
  serviceName: string;
  appointmentStart: string;
  status: AppointmentStatus;
}

interface Props {
  appointments: CalendarAppt[];
  initialYear: number;
  initialMonth: number; // 0-indexed
}

const statusDot: Record<AppointmentStatus, string> = {
  pending:   "bg-amber-400",
  confirmed: "bg-emerald-500",
  rejected:  "bg-red-400",
  cancelled: "bg-gray-300",
  completed: "bg-blue-400",
};

function toISTDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function CalendarView({ appointments, initialYear, initialMonth }: Props) {
  const [year, setYear]   = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function navigate(delta: number) {
    let m = month + delta;
    let y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setMonth(m);
    setYear(y);
    setSelectedDate(null);
  }

  const firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // Monday-first

  // Group appointments by IST date
  const byDate = new Map<string, CalendarAppt[]>();
  for (const appt of appointments) {
    const d = toISTDate(appt.appointmentStart);
    const [y, mo] = d.split("-").map(Number);
    if (y === year && mo === month + 1) {
      if (!byDate.has(d)) byDate.set(d, []);
      byDate.get(d)!.push(appt);
    }
  }

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const selectedAppts = selectedDate ? (byDate.get(selectedDate) ?? []) : [];

  return (
    <div className="space-y-5">
      {/* Month header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1.5 text-muted-text hover:text-rich-black">
          <ChevronLeft size={18} />
        </button>
        <span className="font-heading text-xl text-rich-black min-w-[200px] text-center">{monthLabel}</span>
        <button onClick={() => navigate(1)} className="p-1.5 text-muted-text hover:text-rich-black">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white border border-beige rounded-sm overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-beige">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
            <div key={d} className="py-2 text-center text-xs font-sans font-semibold text-muted-text uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>
        {/* Days */}
        <div className="grid grid-cols-7">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-beige/60 min-h-[72px]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const appts = byDate.get(dateStr) ?? [];
            const isSelected = selectedDate === dateStr;
            const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
            const isToday = dateStr === today;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className={`border-r border-b border-beige/60 min-h-[72px] p-2 text-left transition-colors ${
                  isSelected ? "bg-gold/10" : "hover:bg-ivory/50"
                }`}
              >
                <span
                  className={`text-sm font-sans font-medium inline-flex items-center justify-center w-7 h-7 rounded-full ${
                    isToday ? "bg-gold text-white" : "text-rich-black"
                  }`}
                >
                  {day}
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {appts.slice(0, 4).map((a, idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${statusDot[a.status]}`}
                      title={a.patientName}
                    />
                  ))}
                  {appts.length > 4 && (
                    <span className="text-xs text-muted-text">+{appts.length - 4}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-sans text-muted-text">
        {(Object.entries(statusDot) as [AppointmentStatus, string][]).map(([s, cls]) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${cls}`} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>

      {/* Selected day panel */}
      {selectedDate && (
        <div className="bg-white border border-beige rounded-sm p-5">
          <h3 className="font-heading text-lg text-rich-black mb-4">
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-IN", {
              weekday: "long", day: "numeric", month: "long", year: "numeric",
            })}
          </h3>
          {selectedAppts.length === 0 ? (
            <p className="text-sm text-muted-text">No appointments on this day.</p>
          ) : (
            <div className="space-y-2">
              {selectedAppts.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/appointments/${a.id}`}
                  className="flex items-center gap-3 p-3 bg-ivory/40 border border-beige/60 rounded-sm hover:border-gold/40 transition-colors"
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDot[a.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-sans font-medium text-rich-black truncate">{a.patientName}</p>
                    <p className="text-xs text-muted-text">{a.serviceName} · {formatTime(a.appointmentStart)}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-text shrink-0">{a.bookingReference}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
