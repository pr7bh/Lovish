import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { createAdminClient } from "@/lib/supabase/admin";
import { AvailabilityForm } from "@/components/admin/AvailabilityForm";
import type { ClinicHours, ClinicBreak } from "@/types/admin";

export const metadata: Metadata = {
  title: "Availability — Admin",
  robots: { index: false, follow: false },
};

export default async function AvailabilityPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [hoursRes, breaksRes] = await Promise.all([
    supabase.from("clinic_hours").select("id, weekday, is_open, opening_time, closing_time").order("weekday"),
    supabase.from("clinic_breaks").select("id, weekday, start_time, end_time, is_active").order("weekday"),
  ]);

  const hours: ClinicHours[] = (hoursRes.data ?? []).map((r) => ({
    id: r.id,
    weekday: r.weekday,
    isOpen: r.is_open,
    openingTime: r.opening_time,
    closingTime: r.closing_time,
  }));

  const breaks: ClinicBreak[] = (breaksRes.data ?? []).map((r) => ({
    id: r.id,
    weekday: r.weekday,
    startTime: r.start_time,
    endTime: r.end_time,
    isActive: r.is_active,
  }));

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-muted-text font-sans mb-7">
        Configure clinic working hours and breaks. Changes take effect immediately for new bookings.
      </p>
      <AvailabilityForm hours={hours} breaks={breaks} />
    </div>
  );
}
