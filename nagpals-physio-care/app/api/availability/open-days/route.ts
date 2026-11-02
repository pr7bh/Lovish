import { NextResponse } from "next/server";
import { connection } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Returns which weekdays (0 = Sun … 6 = Sat) the clinic is open.
 * Used by the booking calendar to disable closed days.
 */
export async function GET() {
  await connection();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("clinic_hours")
    .select("weekday")
    .eq("is_open", true)
    .order("weekday");

  if (error) {
    // Return provisional config as a safe fallback
    return NextResponse.json({ openWeekdays: [1, 2, 3, 4, 5, 6] });
  }

  const openWeekdays = (data ?? []).map((row: { weekday: number }) => row.weekday);
  return NextResponse.json({ openWeekdays });
}
