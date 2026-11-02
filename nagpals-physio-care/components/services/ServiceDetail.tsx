import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import type { ServiceData } from "@/lib/services-data";

interface Props {
  service: ServiceData;
  relatedServices: ServiceData[];
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

export function ServiceDetail({ service, relatedServices }: Props) {
  const Icon = service.icon;

  return (
    <>
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Primary content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero image */}
            <AnimateSection>
              <div className="relative aspect-video rounded-sm overflow-hidden border border-beige">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-rich-black/20 to-transparent" />
              </div>
            </AnimateSection>

            {/* Introduction */}
            <AnimateSection>
              <div>
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-gold" />
                </div>
                <p className="text-base md:text-lg text-muted-text leading-relaxed">
                  {service.introduction}
                </p>
              </div>
            </AnimateSection>

            {/* Treatment overview */}
            <AnimateSection delay={0.05}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  Treatment Overview
                </h2>
                <ul className="space-y-3">
                  {service.overview.map((item) => (
                    <ListItem key={item} text={item} />
                  ))}
                </ul>
              </div>
            </AnimateSection>

            {/* Conditions treated */}
            <AnimateSection delay={0.08}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  Conditions We Treat
                </h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {service.conditionsTreated.map((c) => (
                    <div
                      key={c}
                      className="flex items-center gap-3 p-3 rounded-sm bg-ivory border border-beige"
                    >
                      <span className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                        <Check size={9} className="text-gold" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-rich-black/80">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateSection>

            {/* Potential benefits */}
            <AnimateSection delay={0.1}>
              <div className="p-7 rounded-sm bg-beige/50 border border-beige">
                <h2 className="font-heading text-2xl text-rich-black mb-5">
                  Potential Benefits
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <ListItem key={b} text={b} />
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted-text/70 font-sans italic leading-relaxed">
                  Individual outcomes vary. Benefits are based on typical clinical
                  presentations and are not guaranteed for every patient. Your
                  physiotherapist will discuss realistic expectations during your
                  initial assessment.
                </p>
              </div>
            </AnimateSection>

            {/* When to consult */}
            <AnimateSection delay={0.12}>
              <div>
                <h2 className="font-heading text-2xl lg:text-3xl text-rich-black mb-6">
                  When to Consult a Physiotherapist
                </h2>
                <ul className="space-y-3">
                  {service.whenToConsult.map((w) => (
                    <ListItem key={w} text={w} />
                  ))}
                </ul>
              </div>
            </AnimateSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Book CTA card */}
            <AnimateSection from="right">
              <div className="p-6 rounded-sm bg-rich-black">
                <h3 className="font-heading text-xl text-ivory mb-3">
                  Book a Consultation
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed mb-5">
                  Speak with Dr. Lovish Nagpal to find out if this service is
                  right for you.
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

            {/* Related services */}
            {relatedServices.length > 0 && (
              <AnimateSection from="right" delay={0.05}>
                <div className="p-6 rounded-sm bg-ivory border border-beige">
                  <h3 className="font-heading text-lg text-rich-black mb-4">
                    Related Services
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

            {/* All services */}
            <AnimateSection from="right" delay={0.1}>
              <div className="p-5 rounded-sm border border-beige">
                <Link
                  href="/services"
                  className="flex items-center justify-between text-sm font-sans text-muted-text hover:text-gold transition-colors duration-200 group"
                >
                  View All Services
                  <ArrowRight
                    size={14}
                    className="text-gold/50 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </AnimateSection>
          </aside>
        </div>
      </div>

      <AppointmentCTA />
    </>
  );
}
