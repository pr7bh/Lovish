import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, Stethoscope, Heart, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { AppointmentCTA } from "@/components/shared/AppointmentCTA";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { JsonLd } from "@/components/shared/JsonLd";
import { meta, medicalClinicJsonLd } from "@/lib/seo";

export const metadata: Metadata = meta({
  title: "About Dr. Lovish Nagpal",
  description:
    "Meet Dr. Lovish Nagpal, qualified physiotherapist and founder of Nagpal's Physio Care. Learn about his approach to patient-centred, evidence-based physiotherapy.",
  path: "/about",
});

const credentials = [
  { icon: GraduationCap, label: "Qualification", value: "Physiotherapist (PT) · Yamuna Nagar, Haryana, India" },
  { icon: Award, label: "Advanced Techniques", value: "Dry Needling · Cupping Therapy (Wet, Steam, Fire, Moxibustion) · IASTM · Chiropractic Treatment · Hijamah Therapy" },
  { icon: Stethoscope, label: "Specializations", value: "Sports & Orthopedic Rehab · Neurological Physiotherapy · Gynecological Physiotherapy · Pediatric Rehab · Post-Surgical Care (TKR & ACL)" },
  { icon: Heart, label: "Google Rating", value: "5.0 ★ — 52 patient reviews on Google" },
];

const philosophy = [
  {
    heading: "Evidence-Based Practice",
    body: "Every treatment decision at Nagpal's Physio Care is informed by current clinical research and best-practice guidelines. We do not rely on tradition or habit — we use what the evidence supports.",
  },
  {
    heading: "Individualized Assessment",
    body: "No two patients present identically. A thorough assessment allows us to understand not just your symptoms, but the contributing factors, your history, and what matters to you in your recovery.",
  },
  {
    heading: "Active Participation",
    body: "The most lasting results come from patients who understand their condition and are empowered to play an active role in their own recovery. Education and self-management are central to every treatment plan.",
  },
  {
    heading: "Realistic Expectations",
    body: "Honest communication about recovery timelines and realistic outcomes is fundamental to the therapeutic relationship. We will always be transparent about what physiotherapy can and cannot achieve for your specific presentation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={medicalClinicJsonLd()} />

      <PageHero
        overline="About the Clinic"
        heading="Meet Dr. Lovish Nagpal"
        description="Qualified physiotherapist and founder of Nagpal's Physio Care, committed to evidence-based, patient-centred rehabilitation."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Doctor photo */}
          <AnimateSection from="left">
            <div className="relative max-w-md lg:sticky lg:top-28">
              <div className="aspect-[3/4] bg-beige rounded-sm overflow-hidden border border-soft-beige relative">
                <Image
                  src="/images/dr-lovish-nagpal.png"
                  alt="Dr. Lovish Nagpal (PT) — Founder of Nagpal's Physio Care, Yamuna Nagar"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gold z-10" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/20 rounded-sm -z-10" />
            </div>
          </AnimateSection>

          {/* Content */}
          <AnimateSection from="right">
            <div className="space-y-10">
              <div>
                <h2 className="font-heading text-3xl text-rich-black mb-4">
                  Professional Profile
                </h2>
                <div className="space-y-4 text-base text-muted-text leading-relaxed">
                  <p>
                    Dr. Lovish Nagpal (PT) is the founder of Nagpal&apos;s Physio Care,
                    a specialized physiotherapy clinic in Yamuna Nagar, Haryana. His
                    practice is built on a single principle: restoring patients to their
                    best — physically, functionally, and with lasting confidence in
                    their own bodies.
                  </p>
                  <p>
                    He works across a broad clinical spectrum: from post-operative
                    rehabilitation after total knee replacement and ACL reconstruction,
                    to neurological conditions including Parkinson&apos;s disease,
                    paraplegia, and multiple sclerosis — cases where consistent,
                    skilled physiotherapy has made a measurable difference in
                    patients&apos; independence and quality of life.
                  </p>
                  <p>
                    In addition to core physiotherapy, Dr. Nagpal is trained in advanced
                    techniques including dry needling, IASTM (instrument-assisted soft
                    tissue mobilization), cupping therapy, and chiropractic treatment —
                    allowing him to tailor each treatment plan to the individual rather
                    than applying a one-size approach.
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div>
                <h2 className="font-heading text-3xl text-rich-black mb-6">
                  Qualifications &amp; Certifications
                </h2>
                <div className="space-y-5">
                  {credentials.map((c) => {
                    const Icon = c.icon;
                    return (
                      <div key={c.label} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={16} className="text-gold" />
                        </div>
                        <div>
                          <p className="text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-0.5">
                            {c.label}
                          </p>
                          <p className="text-sm text-rich-black/80">{c.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex h-11 items-center gap-2 px-7 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
              >
                Book a Consultation
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </AnimateSection>
        </div>
      </div>

      {/* Philosophy */}
      <section className="py-20 lg:py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateSection>
            <SectionHeader
              overline="How We Work"
              heading="Treatment Philosophy"
              description="The principles that guide every patient interaction and clinical decision at Nagpal's Physio Care."
            />
          </AnimateSection>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {philosophy.map((p, i) => (
              <AnimateSection key={p.heading} delay={i * 0.08}>
                <div className="p-7 rounded-sm border border-beige bg-ivory h-full">
                  <h3 className="font-heading text-xl text-rich-black mb-3">
                    {p.heading}
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed">{p.body}</p>
                </div>
              </AnimateSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic intro */}
      <section className="py-20 lg:py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateSection>
            <div className="flex items-center gap-3 justify-center mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
                The Clinic
              </span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl text-rich-black mb-6">
              About Nagpal&apos;s Physio Care
            </h2>
            <p className="text-base text-muted-text leading-relaxed mb-4">
              Nagpal&apos;s Physio Care is located at 717, Mahavir Colony, East Bhatia
              Nagar, Yamuna Nagar, Haryana — serving patients from across the city
              and surrounding areas. The clinic is open Monday to Saturday from
              9:00 AM to 9:00 PM, and on Sundays from 9:00 AM to 2:00 PM.
            </p>
            <p className="text-base text-muted-text leading-relaxed">
              With a 5.0 rating across 52 Google reviews, the clinic has established
              a reputation for genuine patient outcomes — not just temporary relief,
              but lasting recovery. Whether you&apos;re dealing with a sports injury,
              recovering from surgery, or managing a chronic or neurological
              condition, the team at Nagpal&apos;s Physio Care is here to support
              your journey.
            </p>
          </AnimateSection>
        </div>
      </section>

      <AppointmentCTA />
    </>
  );
}
