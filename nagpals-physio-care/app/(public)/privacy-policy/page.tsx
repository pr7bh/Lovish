import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { meta } from "@/lib/seo";
import { clinic } from "@/lib/clinic-config";

export const metadata: Metadata = meta({
  title: "Privacy Policy",
  description:
    "How Nagpal's Physio Care collects, uses, and protects your personal information when you use our website or submit an appointment enquiry.",
  path: "/privacy-policy",
});

const EFFECTIVE_DATE = "1 November 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        overline="Legal"
        heading="Privacy Policy"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
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
                1. Who We Are
              </h2>
              <p>
                This website is operated by <strong className="text-rich-black/80">Nagpal&apos;s Physio Care</strong>,
                a physiotherapy clinic run by {clinic.doctor}, located at {clinic.address.full.replace("\n", ", ")}.
              </p>
              <p className="mt-3">
                If you have any questions about this policy or your data, please contact us at{" "}
                <a href={clinic.emailHref} className="text-gold underline underline-offset-4">
                  {clinic.email}
                </a>.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                2. Information We Collect
              </h2>
              <p>
                When you submit an appointment enquiry through our website, you provide the following
                information:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Full name (required)",
                  "Mobile number (required)",
                  "Email address (optional)",
                  "Service of interest (required)",
                  "Preferred appointment date (required)",
                  "Preferred appointment time (required)",
                  "Additional notes or message (optional)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                We do not collect any other personal data automatically (no tracking pixels, no
                behavioural analytics, no third-party advertising cookies).
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                3. How Your Information Is Used
              </h2>
              <p>
                The information you submit is used solely to facilitate your appointment enquiry. It
                flows through two channels:
              </p>
              <div className="mt-5 space-y-5">
                <div className="pl-4 border-l-2 border-gold/40">
                  <p className="font-sans font-medium text-rich-black/80 mb-1">WhatsApp</p>
                  <p>
                    Clicking the &ldquo;Send via WhatsApp&rdquo; button opens the WhatsApp application on your
                    device pre-filled with your enquiry details. You review and send the message
                    yourself directly to Dr. Nagpal&apos;s WhatsApp number. This message is not stored on
                    our servers — it is delivered entirely via WhatsApp&apos;s infrastructure.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-gold/40">
                  <p className="font-sans font-medium text-rich-black/80 mb-1">Email notification</p>
                  <p>
                    Your enquiry details are also sent as an email notification to the clinic inbox
                    ({clinic.email}) using the Resend email service. This is a one-time, fire-and-forget
                    notification. We do not store your data in any database — the email is the only
                    record, held in the clinic&apos;s email inbox.
                  </p>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                4. Data Storage
              </h2>
              <p>
                <strong className="text-rich-black/80">We do not operate a database.</strong> No
                appointment enquiry data is stored on our servers or any cloud storage we control.
                The WhatsApp message lives in WhatsApp&apos;s systems. The email notification lives in the
                clinic&apos;s Gmail inbox and is subject to Google&apos;s standard retention policies.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                5. Third-Party Services
              </h2>
              <div className="space-y-4">
                <p>
                  <strong className="text-rich-black/80">Resend</strong> — We use Resend to deliver
                  the email notification. Resend processes your name, mobile number, email address (if
                  provided), and enquiry details transiently to route the email. Resend&apos;s privacy
                  policy governs their handling of this data.
                </p>
                <p>
                  <strong className="text-rich-black/80">WhatsApp</strong> — WhatsApp messages are
                  governed by WhatsApp&apos;s and Meta&apos;s privacy policies.
                </p>
                <p>
                  <strong className="text-rich-black/80">Vercel</strong> — Our website is hosted on
                  Vercel, which may collect server access logs (IP address, browser type, pages
                  requested) for security and operational purposes. Vercel&apos;s privacy policy governs
                  this data.
                </p>
              </div>
            </section>

            {/* 6 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                6. Cookies
              </h2>
              <p>
                This website does not set any tracking or advertising cookies. Vercel&apos;s infrastructure
                may set session-level cookies for security purposes.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                7. Your Rights
              </h2>
              <p>
                You may request deletion or correction of any personal data we hold. Because we do not
                maintain a database, the practical steps are:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Contact us at{" "}
                  <a href={clinic.emailHref} className="text-gold underline underline-offset-4">
                    {clinic.email}
                  </a>{" "}
                  to request deletion of any email records we hold about you.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Delete any WhatsApp messages you sent directly in the WhatsApp application.
                </li>
              </ul>
            </section>

            {/* 8 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. Material changes will be reflected by
                updating the effective date above. Continued use of the website after changes are
                posted constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="font-heading text-2xl text-rich-black mb-4">
                9. Contact
              </h2>
              <p>
                For any privacy-related queries, please reach us at:
              </p>
              <address className="mt-4 not-italic space-y-1 text-sm">
                <p className="font-sans font-medium text-rich-black/80">{clinic.name}</p>
                <p>{clinic.address.street}</p>
                <p>{clinic.address.city}, {clinic.address.state} {clinic.address.pincode}</p>
                <p className="mt-2">
                  <a href={clinic.emailHref} className="text-gold hover:underline">
                    {clinic.email}
                  </a>
                </p>
                <p>
                  <a href={clinic.phoneHref} className="text-gold hover:underline">
                    {clinic.phone}
                  </a>
                </p>
              </address>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-beige">
            <Link
              href="/"
              className="text-sm font-sans text-gold hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </AnimateSection>
      </div>
    </>
  );
}
