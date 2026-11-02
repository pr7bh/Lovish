"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { toggleServiceActive, updateServiceDuration } from "@/lib/admin/actions/services";
import { ConfirmDialog } from "./ConfirmDialog";
import type { AdminService } from "@/types/admin";

interface Props {
  services: AdminService[];
}

export function ServicesTable({ services }: Props) {
  const [durations, setDurations] = useState<Record<string, number>>(
    Object.fromEntries(services.map((s) => [s.id, s.durationMinutes]))
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleToggle(id: string, current: boolean) {
    setError(null);
    const result = await toggleServiceActive(id, !current);
    if (!result.success) setError(result.error);
  }

  async function handleSaveDuration(id: string) {
    setSaving(id);
    setError(null);
    const result = await updateServiceDuration(id, durations[id]);
    setSaving(null);
    if (!result.success) setError(result.error);
    else { setSuccess("Duration updated."); setTimeout(() => setSuccess(null), 3000); }
  }

  return (
    <div className="space-y-4">
      {(error || success) && (
        <div className={`px-4 py-3 rounded-sm text-sm font-sans border ${error ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
          {error ?? success}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-beige">
              {["Service", "Slug", "Duration (min)", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-text uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => (
              <tr key={svc.id} className="border-b border-beige/60 hover:bg-ivory/40 transition-colors">
                <td className="px-4 py-4">
                  <p className="font-medium text-rich-black">{svc.name}</p>
                  {svc.description && (
                    <p className="text-xs text-muted-text mt-0.5 max-w-xs truncate">{svc.description}</p>
                  )}
                </td>
                <td className="px-4 py-4 font-mono text-xs text-rich-black/50">
                  {svc.slug}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={15}
                      max={240}
                      step={15}
                      value={durations[svc.id]}
                      onChange={(e) =>
                        setDurations((d) => ({ ...d, [svc.id]: Number(e.target.value) }))
                      }
                      className="w-20 h-8 px-2 text-sm border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
                    />
                    {durations[svc.id] !== svc.durationMinutes && (
                      <button
                        onClick={() => handleSaveDuration(svc.id)}
                        disabled={saving === svc.id}
                        className="inline-flex items-center gap-1 h-8 px-2 text-xs font-sans bg-gold/10 text-gold border border-gold/30 rounded-sm hover:bg-gold/20 transition-colors disabled:opacity-50"
                      >
                        <Save size={11} />
                        {saving === svc.id ? "…" : "Save"}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold border ${svc.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                    {svc.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <ConfirmDialog
                    trigger={(open) => (
                      <button
                        onClick={open}
                        className={`text-xs font-sans font-medium px-3 py-1.5 rounded-sm border transition-colors ${
                          svc.isActive
                            ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        {svc.isActive ? "Disable" : "Enable"}
                      </button>
                    )}
                    title={svc.isActive ? `Disable ${svc.name}?` : `Enable ${svc.name}?`}
                    description={
                      svc.isActive
                        ? "Disabled services cannot be booked by new patients."
                        : "Enabling this service makes it available for new bookings."
                    }
                    confirmLabel={svc.isActive ? "Yes, disable" : "Yes, enable"}
                    variant={svc.isActive ? "danger" : "primary"}
                    onConfirm={() => handleToggle(svc.id, svc.isActive)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
