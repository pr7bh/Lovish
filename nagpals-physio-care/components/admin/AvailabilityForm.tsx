"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import {
  updateClinicHours,
  addClinicBreak,
  deleteClinicBreak,
} from "@/lib/admin/actions/availability";
import type { ClinicHours, ClinicBreak } from "@/types/admin";
import { WEEKDAY_FULL } from "@/types/admin";

interface Props {
  hours: ClinicHours[];
  breaks: ClinicBreak[];
}

export function AvailabilityForm({ hours, breaks }: Props) {
  const [saving, setSaving] = useState<number | null>(null);
  const [error, setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [localHours, setLocalHours] = useState<ClinicHours[]>(
    Array.from({ length: 7 }, (_, i) => {
      const row = hours.find((h) => h.weekday === i);
      return row ?? { id: "", weekday: i, isOpen: false, openingTime: null, closingTime: null };
    })
  );

  const [breakForm, setBreakForm] = useState({ weekday: 1, startTime: "13:00", endTime: "14:00" });

  async function saveDay(weekday: number) {
    const row = localHours[weekday];
    setSaving(weekday);
    setError(null);
    const result = await updateClinicHours(
      weekday,
      row.isOpen,
      row.openingTime,
      row.closingTime
    );
    setSaving(null);
    if (!result.success) setError(result.error);
    else { setSuccess(`${WEEKDAY_FULL[weekday]} saved.`); setTimeout(() => setSuccess(null), 3000); }
  }

  async function handleAddBreak() {
    setError(null);
    const result = await addClinicBreak(breakForm.weekday, breakForm.startTime, breakForm.endTime);
    if (!result.success) setError(result.error);
    else { setSuccess("Break added."); setTimeout(() => setSuccess(null), 3000); }
  }

  async function handleDeleteBreak(id: string) {
    setError(null);
    const result = await deleteClinicBreak(id);
    if (!result.success) setError(result.error);
  }

  return (
    <div className="space-y-8">
      {(error || success) && (
        <div className={`px-4 py-3 rounded-sm text-sm font-sans border ${error ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
          {error ?? success}
        </div>
      )}

      {/* Working hours */}
      <div>
        <h3 className="font-heading text-lg text-rich-black mb-4">Working Hours</h3>
        <div className="space-y-3">
          {localHours.map((row) => (
            <div key={row.weekday} className="flex flex-wrap items-center gap-3 p-4 bg-white border border-beige rounded-sm">
              <div className="w-28">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={row.isOpen}
                    onChange={(e) =>
                      setLocalHours((prev) =>
                        prev.map((h) =>
                          h.weekday === row.weekday ? { ...h, isOpen: e.target.checked } : h
                        )
                      )
                    }
                    className="accent-gold"
                  />
                  <span className="text-sm font-sans font-medium text-rich-black">
                    {WEEKDAY_FULL[row.weekday]}
                  </span>
                </label>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  value={row.openingTime ?? ""}
                  disabled={!row.isOpen}
                  onChange={(e) =>
                    setLocalHours((prev) =>
                      prev.map((h) =>
                        h.weekday === row.weekday ? { ...h, openingTime: e.target.value } : h
                      )
                    )
                  }
                  className="h-8 px-2 text-sm font-sans border border-beige rounded-sm bg-white disabled:opacity-40 focus:outline-none focus:border-gold"
                />
                <span className="text-muted-text text-sm">–</span>
                <input
                  type="time"
                  value={row.closingTime ?? ""}
                  disabled={!row.isOpen}
                  onChange={(e) =>
                    setLocalHours((prev) =>
                      prev.map((h) =>
                        h.weekday === row.weekday ? { ...h, closingTime: e.target.value } : h
                      )
                    )
                  }
                  className="h-8 px-2 text-sm font-sans border border-beige rounded-sm bg-white disabled:opacity-40 focus:outline-none focus:border-gold"
                />
              </div>
              <button
                onClick={() => saveDay(row.weekday)}
                disabled={saving === row.weekday}
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-sans font-medium bg-gold/10 text-gold border border-gold/30 rounded-sm hover:bg-gold/20 transition-colors disabled:opacity-50"
              >
                <Save size={11} />
                {saving === row.weekday ? "Saving…" : "Save"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Breaks */}
      <div>
        <h3 className="font-heading text-lg text-rich-black mb-4">Clinic Breaks</h3>
        <div className="space-y-2 mb-4">
          {breaks.filter((b) => b.isActive).length === 0 && (
            <p className="text-sm text-muted-text font-sans">No breaks configured.</p>
          )}
          {breaks.filter((b) => b.isActive).map((b) => (
            <div key={b.id} className="flex items-center gap-3 p-3 bg-white border border-beige rounded-sm">
              <span className="text-sm font-sans text-rich-black">{WEEKDAY_FULL[b.weekday]}</span>
              <span className="text-sm font-sans text-muted-text">{b.startTime} – {b.endTime}</span>
              <button
                onClick={() => handleDeleteBreak(b.id)}
                className="ml-auto text-muted-text hover:text-red-600 transition-colors"
                aria-label="Delete break"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add break */}
        <div className="flex flex-wrap items-end gap-3 p-4 bg-ivory/50 border border-beige rounded-sm">
          <div>
            <label className="block text-xs text-muted-text mb-1">Day</label>
            <select
              value={breakForm.weekday}
              onChange={(e) => setBreakForm((f) => ({ ...f, weekday: Number(e.target.value) }))}
              className="h-8 px-2 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
            >
              {WEEKDAY_FULL.map((name, i) => (
                <option key={i} value={i}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-muted-text mb-1">Start</label>
            <input
              type="time"
              value={breakForm.startTime}
              onChange={(e) => setBreakForm((f) => ({ ...f, startTime: e.target.value }))}
              className="h-8 px-2 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-text mb-1">End</label>
            <input
              type="time"
              value={breakForm.endTime}
              onChange={(e) => setBreakForm((f) => ({ ...f, endTime: e.target.value }))}
              className="h-8 px-2 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
            />
          </div>
          <button
            onClick={handleAddBreak}
            className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-sans font-medium bg-gold text-white rounded-sm hover:bg-gold-light transition-colors"
          >
            <Plus size={12} />
            Add break
          </button>
        </div>
      </div>
    </div>
  );
}
