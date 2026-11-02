"use client";

import { Check } from "lucide-react";
import { cn } from "cn";
import type { ServiceData } from "@/lib/services-data";
import { services } from "@/lib/services-data";

interface Props {
  selected: ServiceData | null;
  onSelect: (service: ServiceData) => void;
  onNext: () => void;
}

export default function ServiceSelection({ selected, onSelect, onNext }: Props) {
  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-rich-black mb-2">
        Select a Service
      </h2>
      <p className="text-sm text-muted-text mb-8 max-w-lg">
        Choose the type of physiotherapy you need. Not sure? Select the closest
        option — Dr. Nagpal will assess your individual needs at the appointment.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selected?.slug === service.slug;

          return (
            <button
              key={service.slug}
              onClick={() => onSelect(service)}
              className={cn(
                "text-left p-5 rounded-sm border transition-all duration-200 flex items-start gap-4 group",
                isSelected
                  ? "border-gold bg-gold/5 ring-1 ring-gold/25"
                  : "border-beige bg-warm-white hover:border-gold/40 hover:bg-ivory"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200",
                  isSelected ? "bg-gold/20" : "bg-gold/10 group-hover:bg-gold/15"
                )}
              >
                <Icon size={17} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={cn(
                      "font-heading text-base leading-snug transition-colors duration-200",
                      isSelected ? "text-gold" : "text-rich-black"
                    )}
                  >
                    {service.title}
                  </h3>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shrink-0">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-text leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className="h-11 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
