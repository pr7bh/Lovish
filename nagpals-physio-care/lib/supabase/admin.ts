// Server-only — never import this from client components.
// Uses the service role key which bypasses Row Level Security.
import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "./env";

export function createAdminClient() {
  const { url, serviceRoleKey } = getServerEnv();
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
