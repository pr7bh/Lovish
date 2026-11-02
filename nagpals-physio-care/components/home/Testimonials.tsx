import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "I had a fantastic experience with Nagpal's Physio Care. Dr. Nagpal is highly skilled, professional, and genuinely cares about his patients. He took the time to understand my condition and provided a tailored treatment plan that made a real difference. I noticed significant improvement in my mobility and pain relief within a few sessions.",
    author: "Prabhjot Singh",
    condition: "Mobility & Pain Relief",
    rating: 5,
  },
  {
    text: "I sincerely thank Dr. Lovish Nagpal for helping me overcome my knee pain with such patience and skill. Your personal attention and reassuring approach gave me not just physical relief, but also confidence and comfort. Kudos to you for being such a compassionate physiotherapist.",
    author: "Shalini Chhabra",
    condition: "Knee Pain",
    rating: 5,
  },
  {
    text: "My mother got TKR surgery done. Best response so far — in 6 weeks my mother is able to do squats and all activities. Thank you Dr. Lovish for your kindness and results.",
    author: "Amrit Mandhan",
    condition: "Total Knee Replacement Rehab",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-gold" : "text-beige"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateSection>
          <SectionHeader
            overline="Patient Stories"
            heading="What Our Patients Say"
            description="Rated 5.0 on Google with over 52 reviews. Real outcomes from real patients across Yamuna Nagar and beyond."
          />
        </AnimateSection>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateSection key={i} delay={i * 0.1}>
              <figure className="h-full flex flex-col p-7 rounded-sm bg-warm-white border border-beige">
                <Quote
                  size={28}
                  className="text-gold/30 mb-5"
                  aria-hidden="true"
                />
                <blockquote className="flex-1 text-sm text-muted-text leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption>
                  <StarRating count={t.rating} />
                  <p className="mt-2 font-heading text-base text-rich-black">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-text font-sans mt-0.5">
                    {t.condition}
                  </p>
                </figcaption>
              </figure>
            </AnimateSection>
          ))}
        </div>
      </div>
    </section>
  );
}
