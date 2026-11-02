import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { createAdminClient } from "@/lib/supabase/admin";
import { BlockedDatesForm } from "@/components/admin/BlockedDatesForm";
import type { BlockedSlot } from "@/types/admin";

export const metadata: Metadata = {
  title: "Blocked Dates — Admin",
  robots: { index: false, follow: false },
};

export default async function BlockedDatesPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("blocked_slots")
    .select("id, starts_at, ends_at, reason, created_at")
    .order("starts_at", { ascending: false });

  const blocks: BlockedSlot[] = (data ?? []).map((r) => ({
    id: r.id,
    startsAt: r.starts_at,
    endsAt: r.ends_at,
    reason: r.reason,
    createdAt: r.created_at,
  }));

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-muted-text font-sans mb-7">
        Block holidays, clinic closures, or specific time ranges. Existing confirmed appointments
        in the range must be cancelled before the block can be created.
      </p>
      <BlockedDatesForm blocks={blocks} />
    </div>
  );
}
