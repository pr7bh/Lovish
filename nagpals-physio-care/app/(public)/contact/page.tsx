import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/lib/clinic-config";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { AppointmentForm } from "@/components/shared/AppointmentForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { meta, medicalClinicJsonLd } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "Book an Appointment",
  description:
    "Book a physiotherapy appointment with Dr. Lovish Nagpal at Nagpal's Physio Care, Yamuna Nagar. Fill the form and connect directly via WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={medicalClinicJsonLd()} />

      <PageHero
        overline="Get In Touch"
        heading="Book an Appointment"
        description="Fill in your details below and we'll open WhatsApp with a ready-to-send appointment request for Dr. Lovish Nagpal."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Clinic info + map */}
          <AnimateSection from="left">
            <div>
              <h2 className="font-heading text-3xl text-rich-black mb-8">
                Clinic Information
              </h2>
              <ContactDetails showWhatsApp />

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-sm border border-soft-beige">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    title="Nagpal's Physio Care Location"
                    src="https://www.google.com/maps?q=Nagpal%27s+Physio+Care,+717+Mahavir+Colony,+East+Bhatia+Nagar,+Yamuna+Nagar,+Haryana+135001&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-4 bg-beige/40">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-rich-black">
                      Nagpal&apos;s Physio Care
                    </p>
                    <p className="mt-0.5 text-xs text-muted-text">
                      717, Mahavir Colony, Yamuna Nagar, Haryana
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Nagpal%27s+Physio+Care,+717+Mahavir+Colony,+East+Bhatia+Nagar,+Yamuna+Nagar,+Haryana+135001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-medium tracking-wide text-gold hover:opacity-70 transition-opacity"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </AnimateSection>

          {/* Right — Appointment form */}
          <AnimateSection from="right">
            <div>
              <div className="mb-8">
                <h2 className="font-heading text-3xl text-rich-black mb-3">
                  Request an Appointment
                </h2>
                <p className="text-sm text-muted-text leading-relaxed">
                  Fill in your details and click submit — WhatsApp opens with a
                  pre-filled message ready to send to Dr. Lovish Nagpal.
                </p>
              </div>

              <AppointmentForm />

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <span className="flex-1 h-px bg-beige" />
                <span className="text-xs font-sans text-muted-text/60 uppercase tracking-widest">
                  or contact directly
                </span>
                <span className="flex-1 h-px bg-beige" />
              </div>

              {/* Direct contact quick-links */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href={clinic.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-sm border border-beige bg-warm-white hover:border-gold/40 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-sm bg-[#25D366]/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-[#25D366]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-text/70 mb-0.5">WhatsApp</p>
                    <p className="text-sm font-sans font-medium text-rich-black group-hover:text-gold transition-colors duration-200 truncate">
                      {clinic.whatsapp}
                    </p>
                  </div>
                </a>
                <a
                  href={clinic.phoneHref}
                  className="group flex items-center gap-3 p-4 rounded-sm border border-beige bg-warm-white hover:border-gold/40 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-text/70 mb-0.5">Call Us</p>
                    <p className="text-sm font-sans font-medium text-rich-black group-hover:text-gold transition-colors duration-200 truncate">
                      {clinic.phone}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </AnimateSection>
        </div>
      </div>
    </>
  );
}
