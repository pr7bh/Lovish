import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { createAdminClient } from "@/lib/supabase/admin";
import { ServicesTable } from "@/components/admin/ServicesTable";
import type { AdminService } from "@/types/admin";

export const metadata: Metadata = {
  title: "Services — Admin",
  robots: { index: false, follow: false },
};

export default async function ServicesPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("services")
    .select("id, name, slug, description, duration_minutes, is_active, created_at")
    .order("name");

  const services: AdminService[] = (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    durationMinutes: r.duration_minutes,
    isActive: r.is_active,
    createdAt: r.created_at,
  }));

  return (
    <div>
      <p className="text-sm text-muted-text font-sans mb-5">
        Enable or disable services and update appointment durations. Service slugs are permanent
        and cannot be changed to preserve historical appointment records.
      </p>
      <div className="bg-white border border-beige rounded-sm">
        <ServicesTable services={services} />
      </div>
    </div>
  );
}
