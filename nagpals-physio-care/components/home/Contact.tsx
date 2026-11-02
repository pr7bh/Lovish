import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { ContactDetails } from "@/components/shared/ContactDetails";
import { AppointmentForm } from "@/components/shared/AppointmentForm";

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateSection>
          <SectionHeader
            overline="Get In Touch"
            heading="Book an Appointment"
            description="Ready to start your recovery journey? Reach out to schedule a consultation with Dr. Lovish Nagpal."
          />
        </AnimateSection>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <AnimateSection from="left">
            <div>
              <h3 className="font-heading text-2xl text-rich-black mb-8">
                Clinic Information
              </h3>
              <ContactDetails />

              {/* Map placeholder */}
              
<div className="mt-10 overflow-hidden rounded-sm border border-soft-beige bg-beige">
  <div className="relative aspect-[4/3] w-full">
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

  <div className="flex items-center justify-between gap-4 p-4">
    <div className="min-w-0">
      <p className="text-sm font-medium text-foreground">
        Nagpal&apos;s Physio Care
      </p>
      <p className="mt-1 text-xs text-muted-text">
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

          {/* Form */}
          <AnimateSection from="right">
            <div>
              <h3 className="font-heading text-2xl text-rich-black mb-6">
                Request an Appointment
              </h3>
              <AppointmentForm />
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
