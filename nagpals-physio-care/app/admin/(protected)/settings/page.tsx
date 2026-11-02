import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin/auth";

export const instant = false;
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings — Admin",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-sm text-sm font-sans text-amber-800">
        <Info size={15} className="mt-0.5 shrink-0 text-amber-600" />
        Clinic contact details, timezone, and branding placeholders will be
        configurable here once the clinic provides the final information.
        Working hours and availability are managed in the&nbsp;
        <a href="/admin/availability" className="underline">Availability</a> section.
      </div>

      {/* Timezone (read-only) */}
      <div className="bg-white border border-beige rounded-sm p-5">
        <h3 className="font-heading text-base text-rich-black mb-4">System Settings</h3>
        <dl className="space-y-3 text-sm font-sans">
          <div className="flex justify-between">
            <dt className="text-muted-text">Clinic timezone</dt>
            <dd className="text-rich-black font-medium">Asia/Kolkata (IST, UTC+5:30)</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-text">Booking horizon</dt>
            <dd className="text-rich-black font-medium">60 days</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-text">Slot duration</dt>
            <dd className="text-rich-black font-medium">30 minutes (per-service configurable)</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-text">Overlap prevention</dt>
            <dd className="text-rich-black font-medium">Database-enforced (PostgreSQL EXCLUDE)</dd>
          </div>
        </dl>
      </div>

      {/* Contact placeholders */}
      <div className="bg-white border border-beige rounded-sm p-5">
        <h3 className="font-heading text-base text-rich-black mb-4">Clinic Contact</h3>
        <dl className="space-y-3 text-sm font-sans">
          {[
            ["Clinic name", "Nagpal's Physio Care"],
            ["Address", "717, Mahavir Colony, East Bhatia Nagar, Yamuna Nagar, Haryana 135001"],
            ["Phone number", "+91 72061 99132"],
            ["WhatsApp number", "+91 72061 99132"],
            ["Email address", "Available on request"],
            ["Instagram", "@nagpals_physio_care"],
          ].map(([field, value]) => (
            <div key={field} className="flex justify-between gap-4">
              <dt className="text-muted-text shrink-0">{field}</dt>
              <dd className="text-rich-black font-medium text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
