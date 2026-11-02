import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import { services } from "@/lib/services-data";
import { meta } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Physiotherapy Services",
  description:
    "Explore the full range of physiotherapy services offered at Nagpal's Physio Care — from sports rehabilitation and manual therapy to neurological rehab and specialized techniques.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        overline="What We Offer"
        heading="Our Services"
        description="Evidence-based physiotherapy and rehabilitation tailored to your individual needs. Explore our full range of services below."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimateSection key={service.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full p-7 rounded-sm border border-beige bg-ivory hover:bg-warm-white hover:border-gold/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h2 className="font-heading text-xl text-rich-black mb-3 group-hover:text-gold transition-colors duration-200">
                    {service.title}
                  </h2>
                  <p className="text-sm text-muted-text leading-relaxed flex-1 mb-5">
                    {service.shortDescription}
                  </p>
                  <span className="flex items-center gap-1.5 text-sm font-sans text-gold group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </AnimateSection>
            );
          })}
        </div>
      </div>

      <AppointmentCTA
        heading="Not Sure Which Service You Need?"
        description="Book a consultation and Dr. Lovish Nagpal will assess your condition and recommend the most appropriate treatment approach."
      />
    </>
  );
}
