"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminProfile } from "@/lib/admin/auth";
import type { ActionResult } from "@/types/admin";

export async function updateClinicHours(
  weekday: number,
  isOpen: boolean,
  openingTime: string | null,
  closingTime: string | null
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (isOpen && (!openingTime || !closingTime)) {
    return { success: false, error: "Opening and closing times are required when clinic is open" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("clinic_hours")
    .upsert(
      {
        weekday,
        is_open: isOpen,
        opening_time: isOpen ? openingTime : null,
        closing_time: isOpen ? closingTime : null,
      },
      { onConflict: "weekday" }
    );

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/availability");
  revalidatePath("/api/availability/open-days");
  return { success: true };
}

export async function addClinicBreak(
  weekday: number,
  startTime: string,
  endTime: string
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (startTime >= endTime) {
    return { success: false, error: "Start time must be before end time" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("clinic_breaks").insert({
    weekday,
    start_time: startTime,
    end_time: endTime,
    is_active: true,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/availability");
  return { success: true };
}

export async function deleteClinicBreak(breakId: string): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("clinic_breaks")
    .delete()
    .eq("id", breakId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/availability");
  return { success: true };
}
