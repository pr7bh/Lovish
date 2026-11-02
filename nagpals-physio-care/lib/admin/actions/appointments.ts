"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminProfile } from "@/lib/admin/auth";
import type { ActionResult, AppointmentStatus } from "@/types/admin";

async function adminGuard(): Promise<ActionResult> {
  const profile = await getAdminProfile();
  if (!profile) return { success: false, error: "Unauthorized" };
  return { success: true };
}

export async function updateAppointmentStatus(
  appointmentId: string,
  newStatus: AppointmentStatus,
  adminNotes?: string
): Promise<ActionResult> {
  const guard = await adminGuard();
  if (!guard.success) return guard;

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("update_appointment_status", {
    p_appointment_id: appointmentId,
    p_new_status: newStatus,
    p_admin_notes: adminNotes ?? null,
  });

  if (error) {
    return { success: false, error: "Database error: " + error.message };
  }

  if (!data?.success) {
    return { success: false, error: data?.message ?? "Operation failed" };
  }

  revalidatePath("/admin/appointments");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/calendar");
  return { success: true };
}

export async function rescheduleAppointment(
  appointmentId: string,
  newStart: string,
  newEnd: string,
  adminNotes?: string
): Promise<ActionResult> {
  const guard = await adminGuard();
  if (!guard.success) return guard;

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("reschedule_appointment", {
    p_appointment_id: appointmentId,
    p_new_start: newStart,
    p_new_end: newEnd,
    p_admin_notes: adminNotes ?? null,
  });

  if (error) {
    return { success: false, error: "Database error: " + error.message };
  }

  if (!data?.success) {
    return { success: false, error: data?.message ?? "Could not reschedule" };
  }

  revalidatePath("/admin/appointments");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/calendar");
  return { success: true };
}
