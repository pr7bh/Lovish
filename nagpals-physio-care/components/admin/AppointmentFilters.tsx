"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, X } from "lucide-react";
import type { AppointmentStatus } from "@/types/admin";

const STATUS_OPTIONS: { value: AppointmentStatus | ""; label: string }[] = [
  { value: "",           label: "All statuses" },
  { value: "pending",    label: "Pending" },
  { value: "confirmed",  label: "Confirmed" },
  { value: "completed",  label: "Completed" },
  { value: "rejected",   label: "Rejected" },
  { value: "cancelled",  label: "Cancelled" },
];

export function AppointmentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset pagination on filter change
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => router.push("?");

  const hasFilters =
    searchParams.has("status") ||
    searchParams.has("date") ||
    searchParams.has("q");

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" />
        <input
          type="text"
          placeholder="Reference, name, phone…"
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => setParam("q", e.target.value)}
          className="w-full h-9 pl-8 pr-3 text-sm font-sans border border-beige rounded-sm bg-white text-rich-black placeholder-muted-text focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Status */}
      <select
        value={searchParams.get("status") ?? ""}
        onChange={(e) => setParam("status", e.target.value)}
        className="h-9 px-3 pr-7 text-sm font-sans border border-beige rounded-sm bg-white text-rich-black focus:outline-none focus:border-gold transition-colors"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        value={searchParams.get("date") ?? ""}
        onChange={(e) => setParam("date", e.target.value)}
        className="h-9 px-3 text-sm font-sans border border-beige rounded-sm bg-white text-rich-black focus:outline-none focus:border-gold transition-colors"
      />

      {hasFilters && (
        <button
          onClick={clearAll}
          className="h-9 px-3 flex items-center gap-1.5 text-xs font-sans text-muted-text border border-beige rounded-sm hover:border-rich-black/20 hover:text-rich-black transition-colors"
        >
          <X size={12} />
          Clear
        </button>
      )}
    </div>
  );
}
