import Image from "next/image";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { Award, GraduationCap, Stethoscope } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: GraduationCap,
    label: "Qualification",
    value: "BPT (Gold Medalist), PGIMS Rohtak",
  },
  {
    icon: Award,
    label: "Advanced Techniques",
    value: "Dry Needling · Cupping Therapy · IASTM · Chiropractic · Kinesio Taping",
  },
  {
    icon: Stethoscope,
    label: "Specializations",
    value:
      "Sports, Orthopedic, Neurological & Gynecological Physiotherapy · Pediatric Rehab · Post-Surgical Care",
  },
];

export default function Doctor() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image placeholder */}
          <AnimateSection from="left">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-3/4 bg-beige rounded-sm overflow-hidden border border-soft-beige">
                <Image
                  src="/images/dr-lovish-nagpal.png"
                  alt="Dr. Lovish Nagpal - Physiotherapist at Nagpal's Physio Care"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover object-center"
                />

                <div className="absolute bottom-0 inset-x-0 h-1 bg-gold z-10" />
              </div>

              {/* Accent border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/20 rounded-sm -z-10" />
            </div>
          </AnimateSection>

          {/* Content */}
          <AnimateSection from="right">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-gold" />
                <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
                  Meet Your Physiotherapist
                </span>
              </div>

              <h2 className="font-heading text-4xl lg:text-5xl text-rich-black leading-tight tracking-tight mb-6">
                Dr. Lovish Nagpal
              </h2>

              <p className="text-base text-muted-text leading-relaxed mb-4">
                Dr. Lovish Nagpal (PT) is the founder of Nagpal&apos;s Physio
                Care, a specialized physiotherapy clinic in Yamuna Nagar,
                Haryana. With a patient-first approach and a commitment to
                evidence-based practice, he helps patients recover from a wide
                range of musculoskeletal, neurological, and post-surgical
                conditions.
              </p>

              <p className="text-base text-muted-text leading-relaxed mb-10">
                His clinic is rated 5.0 on Google with over 52 reviews — built
                on outcomes that speak for themselves: from post-TKR patients
                doing squats in six weeks, to neurological cases regaining
                mobility, to athletes returning to sport after complex injuries.
              </p>

              {/* Credentials */}
              <div className="space-y-4 mb-10">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div key={h.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-sans font-medium text-muted-text uppercase tracking-wider mb-0.5">
                          {h.label}
                        </p>
                        <p className="text-sm text-rich-black/80">{h.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="#contact"
                className="inline-flex h-11 items-center gap-2 px-7 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
              >
                Book a Consultation
              </Link>
            </div>
          </AnimateSection>
        </div>
      </div>
    </section>
  );
}
