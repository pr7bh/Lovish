import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { services } from "@/lib/services-data";

export default function Services() {
  const preview = services.slice(0, 6);
  return (
    <section id="services" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateSection>
          <SectionHeader
            overline="What We Offer"
            heading="Comprehensive Physiotherapy Services"
            description="Expert care tailored to your individual needs — from acute injury management to long-term rehabilitation and wellness."
          />
        </AnimateSection>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {preview.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimateSection key={service.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full p-7 rounded-sm border border-beige bg-ivory/60 hover:bg-ivory hover:border-gold/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl text-rich-black mb-3 group-hover:text-gold transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-sans text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight size={13} />
                  </span>
                </Link>
              </AnimateSection>
            );
          })}
        </div>

        <AnimateSection delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex h-11 items-center gap-2 px-7 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
            >
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateSection>
      </div>
    </section>
  );
}
