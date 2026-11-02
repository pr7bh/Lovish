"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminProfile } from "@/lib/admin/auth";
import type { ActionResult } from "@/types/admin";

export async function addBlockedSlot(
  startsAt: string,
  endsAt: string,
  reason: string
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (new Date(startsAt) >= new Date(endsAt)) {
    return { success: false, error: "Start time must be before end time" };
  }

  const supabase = createAdminClient();

  // Warn if there are active appointments in this range
  const { data: conflicts } = await supabase
    .from("appointments")
    .select("id, booking_reference, patient_name")
    .in("status", ["pending", "confirmed"])
    .lt("appointment_start", endsAt)
    .gt("appointment_end", startsAt)
    .limit(5);

  if (conflicts && conflicts.length > 0) {
    return {
      success: false,
      error: `Cannot block: ${conflicts.length} active appointment(s) exist in this range. Cancel or reschedule them first.`,
    };
  }

  const { error } = await supabase.from("blocked_slots").insert({
    starts_at: startsAt,
    ends_at: endsAt,
    reason: reason || null,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/blocked-dates");
  revalidatePath("/admin/calendar");
  return { success: true };
}

export async function deleteBlockedSlot(slotId: string): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("blocked_slots")
    .delete()
    .eq("id", slotId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/blocked-dates");
  revalidatePath("/admin/calendar");
  return { success: true };
}
