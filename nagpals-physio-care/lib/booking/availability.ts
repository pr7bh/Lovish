import type { TimeSlot } from "@/types/booking";
import { BOOKING_CONFIG } from "./booking-config";

export function getTodayIST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: BOOKING_CONFIG.timezone });
}

export function getMaxBookingDate(today: string): string {
  const [y, m, d] = today.split("-").map(Number);
  const date = new Date(y, m - 1, d + BOOKING_CONFIG.maxAdvanceDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * @param openWeekdays  Optional override from the database (GET /api/availability/open-days).
 *                      Falls back to BOOKING_CONFIG.workingDays when absent.
 */
export function isWorkingDay(dateStr: string, openWeekdays?: number[]): boolean {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dayOfWeek = new Date(y, m - 1, d).getDay();
  const workingDays = openWeekdays ?? (BOOKING_CONFIG.workingDays as number[]);
  return (
    workingDays.includes(dayOfWeek) &&
    !(BOOKING_CONFIG.holidays as string[]).includes(dateStr)
  );
}

/** Frontend slot generation — used as a fast fallback if the API is unavailable. */
export function generateTimeSlots(dateStr: string): TimeSlot[] {
  const { openingHour, openingMinute, closingHour, closingMinute, slotDurationMinutes } =
    BOOKING_CONFIG;
  const lunchBreaks = BOOKING_CONFIG.lunchBreaks as { start: string; end: string }[];
  const blockedSlots = BOOKING_CONFIG.blockedSlots as { date: string; time: string }[];

  const slots: TimeSlot[] = [];
  let totalMinutes = openingHour * 60 + openingMinute;
  const closingTotal = closingHour * 60 + closingMinute;

  while (totalMinutes < closingTotal) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

    const inLunch = lunchBreaks.some((lb) => timeStr >= lb.start && timeStr < lb.end);
    const isBlocked = blockedSlots.some((bs) => bs.date === dateStr && bs.time === timeStr);

    const period = h < 12 ? "AM" : "PM";
    const displayH = h % 12 || 12;
    const display = `${displayH}:${String(m).padStart(2, "0")} ${period}`;

    slots.push({ time: timeStr, display, available: !inLunch && !isBlocked });
    totalMinutes += slotDurationMinutes;
  }

  return slots;
}

export function formatBookingDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
