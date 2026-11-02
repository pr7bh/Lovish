import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";

const conditions: { label: string; href?: string }[] = [
  { label: "Back Pain", href: "/conditions/back-pain" },
  { label: "Neck Pain", href: "/conditions/neck-pain" },
  { label: "Knee Pain", href: "/conditions/knee-pain" },
  { label: "Frozen Shoulder", href: "/conditions/frozen-shoulder" },
  { label: "Sports Injuries" },
  { label: "Arthritis & Joint Pain" },
  { label: "Post-Surgical Recovery" },
  { label: "Sciatica & Nerve Pain" },
  { label: "Shoulder Pain & Rotator Cuff" },
  { label: "Headaches & Migraines" },
  { label: "Postural Imbalances" },
  { label: "Muscle Strains & Sprains" },
  { label: "Work-Related Injuries" },
  { label: "Balance & Gait Disorders" },
  { label: "Tennis & Golfer's Elbow" },
  { label: "Plantar Fasciitis & Foot Pain" },
];

export default function Conditions() {
  return (
    <section id="conditions" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateSection>
          <SectionHeader
            overline="We Can Help With"
            heading="Conditions We Treat"
            description="We provide evidence-based physiotherapy for a wide range of musculoskeletal, neurological, and sports-related conditions."
          />
        </AnimateSection>

        <AnimateSection delay={0.15}>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {conditions.map((condition) => {
              const inner = (
                <>
                  <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-gold" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-rich-black/80 font-sans">
                    {condition.label}
                  </span>
                </>
              );
              return condition.href ? (
                <Link
                  key={condition.label}
                  href={condition.href}
                  className="flex items-center gap-3 p-4 rounded-sm bg-warm-white border border-beige hover:border-gold/40 hover:text-gold transition-colors duration-200"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={condition.label}
                  className="flex items-center gap-3 p-4 rounded-sm bg-warm-white border border-beige"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </AnimateSection>

        <AnimateSection delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted-text">
            Don&apos;t see your condition listed?{" "}
            <a
              href="#contact"
              className="text-gold hover:underline underline-offset-2"
            >
              Get in touch
            </a>{" "}
            — we assess a wide range of conditions.
          </p>
        </AnimateSection>
      </div>
    </section>
  );
}
