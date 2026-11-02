import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import { conditions } from "@/lib/conditions-data";
import { meta } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Conditions We Treat",
  description:
    "Nagpal's Physio Care treats a wide range of musculoskeletal and neurological conditions. Explore detailed information on back pain, neck pain, knee injuries, and more.",
  path: "/conditions",
});

export default function ConditionsPage() {
  return (
    <>
      <PageHero
        overline="Conditions We Treat"
        heading="Your Condition, Explained"
        description="Understand your condition, its causes, and how evidence-based physiotherapy can help you recover and stay well."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Conditions", href: "/conditions" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {conditions.map((condition, i) => (
            <AnimateSection key={condition.slug} delay={i * 0.06}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="group flex flex-col h-full p-7 rounded-sm border border-beige bg-ivory hover:bg-warm-white hover:border-gold/40 hover:shadow-md transition-all duration-300"
              >
                <h2 className="font-heading text-xl text-rich-black mb-3 group-hover:text-gold transition-colors duration-200">
                  {condition.title}
                </h2>
                <p className="text-sm text-muted-text leading-relaxed flex-1 mb-5">
                  {condition.shortDescription}
                </p>
                <span className="flex items-center gap-1.5 text-sm font-sans text-gold group-hover:gap-2.5 transition-all duration-200">
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            </AnimateSection>
          ))}
        </div>
      </div>

      <AppointmentCTA
        heading="Dealing with a Condition Not Listed?"
        description="Dr. Lovish Nagpal treats a broad spectrum of musculoskeletal and neurological conditions. Book a consultation to discuss your specific needs."
      />
    </>
  );
}
