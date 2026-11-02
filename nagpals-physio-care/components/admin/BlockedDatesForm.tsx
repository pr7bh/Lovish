"use client";

import { useState } from "react";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { addBlockedSlot, deleteBlockedSlot } from "@/lib/admin/actions/blocked-dates";
import type { BlockedSlot } from "@/types/admin";
import { ConfirmDialog } from "./ConfirmDialog";

interface Props {
  blocks: BlockedSlot[];
}

function formatRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const end = new Date(endsAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${start} – ${end}`;
}

export function BlockedDatesForm({ blocks }: Props) {
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    date:     "",
    allDay:   true,
    start:    "00:00",
    end:      "23:59",
    reason:   "",
  });

  async function handleAdd() {
    if (!form.date) { setError("Please select a date."); return; }
    setError(null);

    const tzOffset = "+05:30";
    const startsAt = `${form.date}T${form.allDay ? "00:00" : form.start}:00${tzOffset}`;
    const endsAt   = `${form.date}T${form.allDay ? "23:59" : form.end}:59${tzOffset}`;

    const result = await addBlockedSlot(startsAt, endsAt, form.reason);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess("Block added successfully.");
      setForm((f) => ({ ...f, date: "", reason: "" }));
      setTimeout(() => setSuccess(null), 3000);
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteBlockedSlot(id);
    if (!result.success) setError(result.error);
  }

  return (
    <div className="space-y-8">
      {(error || success) && (
        <div className={`flex items-start gap-2.5 px-4 py-3 rounded-sm text-sm font-sans border ${error ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
          {error && <AlertTriangle size={14} className="mt-0.5 shrink-0" />}
          {error ?? success}
        </div>
      )}

      {/* Existing blocks */}
      <div>
        <h3 className="font-heading text-lg text-rich-black mb-4">Blocked Dates &amp; Ranges</h3>
        {blocks.length === 0 ? (
          <p className="text-sm text-muted-text font-sans">No blocked dates configured.</p>
        ) : (
          <div className="space-y-2">
            {blocks.map((b) => (
              <div key={b.id} className="flex items-center gap-4 p-4 bg-white border border-beige rounded-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sans text-rich-black">{formatRange(b.startsAt, b.endsAt)}</p>
                  {b.reason && <p className="text-xs text-muted-text mt-0.5">{b.reason}</p>}
                </div>
                <ConfirmDialog
                  trigger={(open) => (
                    <button
                      onClick={open}
                      className="text-muted-text hover:text-red-600 transition-colors shrink-0"
                      aria-label="Remove block"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                  title="Remove block"
                  description="Remove this blocked date/range? Availability will open up for new bookings."
                  confirmLabel="Yes, remove"
                  variant="danger"
                  onConfirm={() => handleDelete(b.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add block */}
      <div className="p-5 bg-ivory/50 border border-beige rounded-sm space-y-4">
        <h4 className="font-heading text-base text-rich-black">Block a date or range</h4>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-xs text-muted-text mb-1">Date (IST)</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="h-9 px-3 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-sans text-rich-black cursor-pointer">
            <input
              type="checkbox"
              checked={form.allDay}
              onChange={(e) => setForm((f) => ({ ...f, allDay: e.target.checked }))}
              className="accent-gold"
            />
            All day
          </label>
          {!form.allDay && (
            <>
              <div>
                <label className="block text-xs text-muted-text mb-1">From</label>
                <input
                  type="time"
                  value={form.start}
                  onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
                  className="h-9 px-3 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-text mb-1">To</label>
                <input
                  type="time"
                  value={form.end}
                  onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))}
                  className="h-9 px-3 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
                />
              </div>
            </>
          )}
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs text-muted-text mb-1">Reason (optional)</label>
            <input
              type="text"
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="Holiday, doctor unavailable…"
              className="w-full h-9 px-3 text-sm font-sans border border-beige rounded-sm bg-white focus:outline-none focus:border-gold"
            />
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-sans font-medium bg-gold text-white rounded-sm hover:bg-gold-light transition-colors shrink-0"
          >
            <Plus size={14} />
            Block
          </button>
        </div>
      </div>
    </div>
  );
}
