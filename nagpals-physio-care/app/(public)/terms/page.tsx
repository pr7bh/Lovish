import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { meta } from "@/lib/seo";
import { clinic } from "@/lib/clinic-config";

export const metadata: Metadata = meta({
  title: "Terms of Service",
  description:
    "Terms of service for Nagpal's Physio Care website. Understand what submitting an appointment enquiry means and the limitations of our online service.",
  path: "/terms",
});

const EFFECTIVE_DATE = "1 November 2025";

export default function TermsPage() {
  return (
    <>
      <PageHero
        overline="Legal"
        heading="Terms of Service"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <AnimateSection>
          <p className="text-sm text-muted-text font-sans mb-10">
            Effective date: {EFFECTIVE_DATE}
          </p>

          <div className="space-y-12 text-base text-muted-text leading-relaxed">

            {/* 1 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Nagpal&apos;s Physio Care website
                (&ldquo;Website&rdquo;), you agree to be bound by these Terms of Service.
                If you do not agree, please do not use the Website.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                2. Enquiry vs. Confirmed Appointment
              </h2>
              <div className="pl-4 border-l-2 border-gold/40">
                <p className="font-sans font-medium text-rich-black/80 mb-2">
                  Important — please read carefully
                </p>
                <p>
                  Submitting the appointment form on this Website constitutes an{" "}
                  <strong className="text-rich-black/80">enquiry only</strong>. It is not a booking
                  and does not guarantee an appointment slot.
                </p>
                <p className="mt-3">
                  An appointment is confirmed <strong className="text-rich-black/80">only when</strong>{" "}
                  {clinic.doctor} or a member of the clinic team explicitly responds to you via
                  WhatsApp or phone and confirms the date and time.
                </p>
              </div>
              <p className="mt-4">
                Please do not present yourself at the clinic solely on the basis of submitting this
                form without receiving a confirmation response.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                3. Healthcare Disclaimer
              </h2>
              <p>
                The content published on this Website — including blog articles, condition
                descriptions, and service pages — is provided for general informational and
                educational purposes only.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "It does not constitute medical advice, diagnosis, or treatment.",
                  "It is not a substitute for consultation with a qualified healthcare professional.",
                  "Individual outcomes from physiotherapy treatment vary and cannot be guaranteed.",
                  "Do not disregard professional medical advice or delay seeking it because of something you read on this Website.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                If you are experiencing a medical emergency, call emergency services immediately.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                4. Limitation of Liability
              </h2>
              <p>
                Nagpal&apos;s Physio Care and its operators make no warranties, express or implied,
                regarding the accuracy, completeness, or fitness for a particular purpose of any
                content on this Website.
              </p>
              <p className="mt-3">
                To the fullest extent permitted by law, Nagpal&apos;s Physio Care shall not be liable
                for any direct, indirect, incidental, or consequential damages arising from your use of
                the Website or reliance on its content.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                5. Intellectual Property
              </h2>
              <p>
                All content on this Website — including text, images, logos, and design — is the
                property of Nagpal&apos;s Physio Care unless otherwise stated. You may not reproduce,
                distribute, or create derivative works from this content without prior written
                permission.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                6. Links to Third-Party Sites
              </h2>
              <p>
                This Website may contain links to third-party websites (such as WhatsApp and
                Instagram). These links are provided for convenience only. We do not endorse or control
                these sites and are not responsible for their content or privacy practices.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                7. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from your use of
                this Website shall be subject to the exclusive jurisdiction of the courts in Yamuna
                Nagar, Haryana.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                8. Changes to These Terms
              </h2>
              <p>
                We may revise these Terms at any time. Updates will be reflected by changing the
                effective date above. Your continued use of the Website after any changes constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                9. Contact
              </h2>
              <p>For questions about these Terms, please contact:</p>
              <address className="mt-4 not-italic space-y-1 text-sm">
                <p className="font-sans font-medium text-rich-black/80">{clinic.name}</p>
                <p>{clinic.address.street}</p>
                <p>{clinic.address.city}, {clinic.address.state} {clinic.address.pincode}</p>
                <p className="mt-2">
                  <a href={clinic.emailHref} className="text-gold hover:underline">
                    {clinic.email}
                  </a>
                </p>
              </address>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-beige flex gap-6">
            <Link href="/" className="text-sm font-sans text-gold hover:underline">
              ← Back to Home
            </Link>
            <Link href="/privacy-policy" className="text-sm font-sans text-gold hover:underline">
              Privacy Policy →
            </Link>
          </div>
        </AnimateSection>
      </div>
    </>
  );
}
