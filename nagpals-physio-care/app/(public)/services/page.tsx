import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
                  className="group flex flex-col h-full rounded-sm border border-beige bg-ivory hover:border-gold/40 hover:shadow-md overflow-hidden transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      priority={i === 0}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-sm bg-ivory/90 flex items-center justify-center">
                      <Icon size={15} className="text-gold" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="font-heading text-xl text-rich-black mb-2 group-hover:text-gold transition-colors duration-200">
                      {service.title}
                    </h2>
                    <p className="text-sm text-muted-text leading-relaxed flex-1 mb-4">
                      {service.shortDescription}
                    </p>
                    <span className="flex items-center gap-1.5 text-sm font-sans text-gold group-hover:gap-2.5 transition-all duration-200">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
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
