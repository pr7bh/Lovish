"use client";

import { Check } from "lucide-react";
import { cn } from "cn";
import type { BookingStep } from "@/types/booking";

const STEPS: { label: string; sublabel: string }[] = [
  { label: "Service", sublabel: "What you need" },
  { label: "Date", sublabel: "Pick a day" },
  { label: "Time", sublabel: "Pick a slot" },
  { label: "Details", sublabel: "Your info" },
  { label: "Review", sublabel: "Confirm" },
];

interface Props {
  current: BookingStep;
}

export default function BookingProgress({ current }: Props) {
  return (
    <nav aria-label="Booking steps" className="py-4">
      <ol className="flex items-center">
        {STEPS.map((step, idx) => {
          const num = (idx + 1) as BookingStep;
          const isDone = num < current;
          const isActive = num === current;

          return (
            <li key={num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1 min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all duration-300 shrink-0",
                    isDone && "bg-gold text-white",
                    isActive && "bg-gold text-white ring-4 ring-gold/20",
                    !isDone && !isActive && "bg-beige text-muted-text"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : num}
                </div>
                <span
                  className={cn(
                    "hidden sm:block text-[10px] font-sans font-medium text-center leading-tight truncate max-w-[64px]",
                    isActive ? "text-gold" : isDone ? "text-rich-black/60" : "text-muted-text/60"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-2 sm:mx-3 transition-colors duration-300",
                    num < current ? "bg-gold" : "bg-beige"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
