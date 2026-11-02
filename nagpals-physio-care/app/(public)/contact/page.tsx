import type { Metadata } from "next";
import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { AppointmentForm } from "@/components/shared/AppointmentForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { meta, medicalClinicJsonLd } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Contact & Appointments",
  description:
    "Book an appointment or get in touch with Nagpal's Physio Care. Find our clinic address, phone number, email, and opening hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={medicalClinicJsonLd()} />

      <PageHero
        overline="Get In Touch"
        heading="Contact & Appointments"
        description="We'd love to hear from you. Book an appointment, ask a question, or find out how we can help with your recovery."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Clinic info */}
          <AnimateSection from="left">
            <div>
              <h2 className="font-heading text-3xl text-rich-black mb-8">
                Clinic Information
              </h2>
              <ContactDetails showWhatsApp />

              {/* WhatsApp CTA */}
              <div className="mt-8 p-5 rounded-sm bg-beige/60 border border-beige flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-sans font-medium text-rich-black mb-1">
                    Prefer WhatsApp?
                  </p>
                  <p className="text-sm text-muted-text mb-3">
                    Send us a message on WhatsApp to book or ask a question.
                  </p>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center px-5 bg-gold text-white text-xs font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
                  >
                    Chat on WhatsApp
                  </Link>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[4/3] bg-beige rounded-sm border border-soft-beige flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gold/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-text/50 font-sans tracking-widest uppercase">
                    Map Placeholder
                  </p>
                </div>
              </div>
            </div>
          </AnimateSection>

          {/* Form */}
          <AnimateSection from="right">
            <div>
              <h2 className="font-heading text-3xl text-rich-black mb-6">
                Request an Appointment
              </h2>
              <p className="text-sm text-muted-text leading-relaxed mb-8">
                Fill in the form below and we&apos;ll be in touch to confirm your
                appointment. Fields marked with{" "}
                <span className="text-gold">*</span> are required.
              </p>
              <AppointmentForm />
            </div>
          </AnimateSection>
        </div>
      </div>
    </>
  );
}
