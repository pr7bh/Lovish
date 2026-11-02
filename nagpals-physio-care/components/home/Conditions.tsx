import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";

const conditions = [
  { label: "Back Pain", href: "/conditions/back-pain" },
  { label: "Neck Pain", href: "/conditions/neck-pain" },
  { label: "Knee Pain", href: "/conditions/knee-pain" },
  { label: "Frozen Shoulder", href: "/conditions/frozen-shoulder" },
  { label: "Sports Injuries", href: "/conditions/sports-injuries" },
  { label: "Arthritis & Joint Pain", href: "/conditions/arthritis-joint-pain" },
  { label: "Post-Surgical Recovery", href: "/conditions/post-surgical-recovery" },
  { label: "Sciatica & Nerve Pain", href: "/conditions/sciatica-nerve-pain" },
  { label: "Shoulder Pain", href: "/conditions/shoulder-pain" },
  { label: "Headaches & Migraines", href: "/conditions/headaches-migraines" },
  { label: "Postural Imbalances", href: "/conditions/postural-imbalances" },
  { label: "Muscle Strains & Sprains", href: "/conditions/muscle-strains-sprains" },
  { label: "Work-Related Injuries", href: "/conditions/work-related-injuries" },
  { label: "Balance & Gait Disorders", href: "/conditions/balance-gait-disorders" },
  { label: "Tennis & Golfer's Elbow", href: "/conditions/tennis-golfers-elbow" },
  { label: "Plantar Fasciitis", href: "/conditions/plantar-fasciitis" },
];

export default function Conditions() {
  return (
    <section id="conditions" className="py-24 lg:py-32 bg-rich-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <AnimateSection>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-14 lg:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-gold" />
                <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
                  We Can Help With
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight tracking-tight">
                Conditions<br className="hidden sm:block" /> We Treat
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-base text-ivory/50 leading-relaxed max-w-sm">
                We provide evidence-based physiotherapy for a wide range of
                musculoskeletal, neurological, and sports-related conditions.
              </p>
              <Link
                href="/conditions"
                className="group inline-flex items-center gap-2 text-sm font-sans font-medium text-gold hover:text-gold-light transition-colors duration-200 w-fit"
              >
                Browse all conditions
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </AnimateSection>

        {/* Hairline divider */}
        <div className="h-px bg-ivory/10" />

        {/* Conditions grid — gap-px on ivory/[0.08] creates hairline cell borders */}
        <AnimateSection delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/[0.08]">
            {conditions.map((condition, i) => (
              <Link
                key={condition.href}
                href={condition.href}
                className="group flex items-center gap-3 px-5 py-[18px] bg-rich-black hover:bg-ivory/[0.05] transition-colors duration-200"
              >
                <span className="font-sans text-[11px] tabular-nums text-gold/30 group-hover:text-gold/60 transition-colors duration-200 shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm text-ivory/55 group-hover:text-ivory transition-colors duration-200 leading-snug flex-1">
                  {condition.label}
                </span>
                <ArrowUpRight
                  size={13}
                  className="shrink-0 opacity-0 group-hover:opacity-100 text-gold transition-opacity duration-200"
                />
              </Link>
            ))}
          </div>
        </AnimateSection>

        {/* Footer note */}
        <AnimateSection delay={0.2}>
          <p className="mt-8 text-sm text-ivory/30 text-center">
            Don&apos;t see your condition?{" "}
            <a
              href="#contact"
              className="text-gold/60 hover:text-gold transition-colors duration-200 hover:underline underline-offset-2"
            >
              Contact us
            </a>{" "}
            — we assess a wide range of presentations.
          </p>
        </AnimateSection>

      </div>
    </section>
  );
}
