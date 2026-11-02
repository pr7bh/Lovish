import { SectionHeader } from "@/components/shared/SectionHeader";
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
        <AnimateSection>
          <SectionHeader
            overline="Why Choose Us"
            heading="The Nagpal's Difference"
            description="We believe exceptional physiotherapy is built on trust, expertise, and a genuine commitment to your well-being."
            className="[&_h2]:text-ivory [&_p]:text-ivory/60 [&_.text-gold]:text-gold [&_.bg-gold]:bg-gold"
          />
        </AnimateSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimateSection key={r.title} delay={i * 0.08}>
                <div className="group p-7 rounded-sm border border-ivory/10 hover:border-gold/30 hover:bg-ivory/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-sm bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/25 transition-colors duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-xl text-ivory mb-3">
                    {r.title}
                  </h3>
                  <p className="text-sm text-ivory/55 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </AnimateSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
