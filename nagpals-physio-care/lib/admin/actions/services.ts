"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminProfile } from "@/lib/admin/auth";
import type { ActionResult } from "@/types/admin";

export async function toggleServiceActive(
  serviceId: string,
  isActive: boolean
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("services")
    .update({ is_active: isActive })
    .eq("id", serviceId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateServiceDuration(
  serviceId: string,
  durationMinutes: number
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  if (durationMinutes < 15 || durationMinutes > 240) {
    return { success: false, error: "Duration must be between 15 and 240 minutes" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("services")
    .update({ duration_minutes: durationMinutes })
    .eq("id", serviceId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateServiceDescription(
  serviceId: string,
  description: string
): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("services")
    .update({ description: description || null })
    .eq("id", serviceId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/services");
  return { success: true };
}
