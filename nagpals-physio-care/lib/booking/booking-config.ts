export const BOOKING_CONFIG = {
  timezone: "Asia/Kolkata",
  openingHour: 10,
  openingMinute: 0,
  closingHour: 20,
  closingMinute: 0,
  slotDurationMinutes: 30,
  // 0 = Sunday, 1 = Monday, …, 6 = Saturday
  workingDays: [1, 2, 3, 4, 5, 6] as number[], // Mon–Sat
  lunchBreaks: [] as { start: string; end: string }[],
  holidays: [] as string[], // YYYY-MM-DD strings
  blockedSlots: [] as { date: string; time: string }[],
  maxAdvanceDays: 60,
} as const;
