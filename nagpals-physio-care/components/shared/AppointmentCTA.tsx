import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  heading?: string;
  description?: string;
}

export function AppointmentCTA({
  heading = "Ready to Begin Your Recovery?",
  description = "Book a consultation with Dr. Lovish Nagpal and take the first step toward moving with confidence.",
}: Props) {
  return (
    <section className="py-20 lg:py-24 bg-beige border-t border-soft-beige" aria-label="Book an appointment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-xs font-sans font-medium tracking-widest text-gold uppercase">
              Get Started
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl text-rich-black leading-tight tracking-tight mb-5">
            {heading}
          </h2>
          <p className="text-base text-muted-text leading-relaxed mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-all duration-200"
            >
              Book an Appointment
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center px-8 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
