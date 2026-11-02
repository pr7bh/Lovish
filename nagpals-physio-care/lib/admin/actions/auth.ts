"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ActionResult } from "@/types/admin";

export async function signIn(
  email: string,
  password: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  // Verify the user has an admin profile before granting access.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication failed." };
  }

  const adminClient = createAdminClient();
  const { data: profile } = await adminClient
    .from("admin_profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    return { success: false, error: "You do not have admin access to this clinic." };
  }

  redirect("/admin/dashboard");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
