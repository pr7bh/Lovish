import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import { getRelatedServices } from "@/lib/services-data";
import type { ConditionData } from "@/lib/conditions-data";

interface Props {
  condition: ConditionData;
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
        <Check size={11} className="text-gold" strokeWidth={3} />
      </span>
      <span className="text-sm text-muted-text leading-relaxed">{text}</span>
    </li>
  );
}

export function ConditionDetail({ condition }: Props) {
  const relatedServices = getRelatedServices(condition.relatedServiceSlugs);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Primary content */}
          <div className="lg:col-span-2 space-y-12">
            <AnimateSection>
              <p className="text-base md:text-lg text-muted-text leading-relaxed">
                {condition.introduction}
              </p>
            </AnimateSection>

            {/* Symptoms */}
            <AnimateSection delay={0.05}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  Common Symptoms
                </h2>
                <ul className="space-y-3">
                  {condition.symptoms.map((s) => (
                    <ListItem key={s} text={s} />
                  ))}
                </ul>
              </div>
            </AnimateSection>

            {/* Causes */}
            <AnimateSection delay={0.08}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  Possible Causes
                </h2>
                <ul className="space-y-3">
                  {condition.causes.map((c) => (
                    <ListItem key={c} text={c} />
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted-text/70 font-sans italic">
                  These are common contributing factors. Accurate diagnosis
                  requires a clinical assessment by a qualified physiotherapist or
                  medical professional.
                </p>
              </div>
            </AnimateSection>

            {/* Treatment approaches */}
            <AnimateSection delay={0.1}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  Physiotherapy Treatment Approaches
                </h2>
                <ul className="space-y-3">
                  {condition.treatmentApproaches.map((t) => (
                    <ListItem key={t} text={t} />
                  ))}
                </ul>
              </div>
            </AnimateSection>

            {/* When to seek */}
            <AnimateSection delay={0.12}>
              <div className="p-7 rounded-sm bg-gold/8 border border-gold/20">
                <h2 className="font-heading text-2xl text-rich-black mb-5">
                  When to Seek Professional Assessment
                </h2>
                <ul className="space-y-3">
                  {condition.whenToSeek.map((w) => (
                    <ListItem key={w} text={w} />
                  ))}
                </ul>
              </div>
            </AnimateSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AnimateSection from="right">
              <div className="p-6 rounded-sm bg-rich-black">
                <h3 className="font-heading text-xl text-ivory mb-3">
                  Concerned About This Condition?
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed mb-5">
                  A proper clinical assessment is the best place to start. Book a
                  consultation today.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex w-full h-11 items-center justify-center gap-2 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
                >
                  Book Appointment
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </AnimateSection>

            {relatedServices.length > 0 && (
              <AnimateSection from="right" delay={0.05}>
                <div className="p-6 rounded-sm bg-ivory border border-beige">
                  <h3 className="font-heading text-lg text-rich-black mb-4">
                    Relevant Services
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center justify-between text-sm text-muted-text hover:text-gold transition-colors duration-200 group"
                        >
                          {s.title}
                          <ArrowRight
                            size={14}
                            className="text-gold/50 group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateSection>
            )}

            <AnimateSection from="right" delay={0.1}>
              <div className="p-5 rounded-sm border border-beige text-xs text-muted-text font-sans leading-relaxed">
                <strong className="text-rich-black/80">Disclaimer:</strong> The
                information on this page is for educational purposes only and does
                not constitute medical advice. Always consult a qualified
                healthcare professional for diagnosis and treatment.
              </div>
            </AnimateSection>
          </aside>
        </div>
      </div>

      <AppointmentCTA
        heading="Ready for Your Assessment?"
        description="Don't manage pain alone. Book a consultation with Dr. Lovish Nagpal for a thorough clinical assessment."
      />
    </>
  );
}
