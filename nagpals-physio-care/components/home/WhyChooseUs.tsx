import { AnimateSection } from "@/components/shared/AnimateSection";
import {
  FlaskConical,
  Target,
  ClipboardList,
  Shield,
  User,
  CalendarDays,
} from "lucide-react";

const reasons = [
  {
    icon: FlaskConical,
    title: "Evidence-Based Practice",
    description:
      "Every treatment decision is grounded in current clinical research and best-practice guidelines.",
  },
  {
    icon: Target,
    title: "Personalized Treatment",
    description:
      "No two patients are the same. Your care plan is designed around your unique goals, lifestyle, and condition.",
  },
  {
    icon: ClipboardList,
    title: "Comprehensive Assessment",
    description:
      "Thorough evaluation before any treatment begins ensures we identify root causes, not just symptoms.",
  },
  {
    icon: Shield,
    title: "Safe & Effective Care",
    description:
      "All treatments are applied by a qualified physiotherapist following strict clinical and safety standards.",
  },
  {
    icon: User,
    title: "Patient-Centered Approach",
    description:
      "Your recovery goals drive every decision. We work with you, not just on you.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Scheduling",
    description:
      "Appointment times designed around your schedule so your recovery fits into your life.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-rich-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — split layout */}
        <AnimateSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-gold" />
                <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl text-ivory leading-tight tracking-tight max-w-md">
                Our Difference
              </h2>
            </div>
            <p className="text-base text-ivory/55 leading-relaxed max-w-sm lg:text-right lg:pb-1">
              Exceptional physiotherapy built on trust, expertise, and a genuine
              commitment to your well-being.
            </p>
          </div>
        </AnimateSection>

        {/* Thin divider */}
        <div className="mt-14 mb-0 w-full h-px bg-ivory/10" />

        {/* Grid — 1px gap trick creates subtle cell borders */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/10">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimateSection key={r.title} delay={i * 0.07}>
                <div className="group flex flex-col gap-4 p-8 bg-rich-black hover:bg-ivory/[0.04] transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-ivory mb-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-ivory/50 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>
              </AnimateSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
