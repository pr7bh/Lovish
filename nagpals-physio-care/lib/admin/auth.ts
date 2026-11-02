// Server-only — do not import in client components.
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AdminProfile } from "@/types/admin";

/**
 * Verifies the current request has a valid Supabase session AND an
 * entry in admin_profiles.  Redirects to /admin/login if either check
 * fails.  Use in server components and layouts.
 */
export async function requireAdmin(): Promise<AdminProfile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const adminSupabase = createAdminClient();
  const { data: profile } = await adminSupabase
    .from("admin_profiles")
    .select("id, auth_user_id, full_name, role")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    // Authenticated but not an admin — sign out and redirect.
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  return {
    id: profile.id,
    authUserId: profile.auth_user_id,
    fullName: profile.full_name,
    role: profile.role as "admin" | "superadmin",
  };
}

/**
 * Like requireAdmin but returns null instead of redirecting.
 * Use inside server actions where a redirect would be unexpected.
 */
export async function getAdminProfile(): Promise<AdminProfile | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const adminSupabase = createAdminClient();
    const { data: profile } = await adminSupabase
      .from("admin_profiles")
      .select("id, auth_user_id, full_name, role")
      .eq("auth_user_id", user.id)
      .single();

    if (!profile) return null;

    return {
      id: profile.id,
      authUserId: profile.auth_user_id,
      fullName: profile.full_name,
      role: profile.role as "admin" | "superadmin",
    };
  } catch {
    return null;
  }
}
