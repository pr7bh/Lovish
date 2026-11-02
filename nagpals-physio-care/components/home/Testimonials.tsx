"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimateSection } from "@/components/shared/AnimateSection";

const testimonials = [
  {
    text: "I had a fantastic experience with Nagpal's Physio Care. Dr. Nagpal is highly skilled, professional, and genuinely cares about his patients. He took the time to understand my condition and provided a tailored treatment plan that made a real difference. I noticed significant improvement in my mobility and pain relief within a few sessions.",
    author: "Prabhjot Singh",
    condition: "Mobility & Pain Relief",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    text: "I had an excellent experience with this physiotherapist. I was dealing with lower back pain, and as an athlete, getting the right treatment was very important for me. They took the time to thoroughly assess my condition and never rushed the treatment.",
    author: "Yashleen Kaur",
    condition: "Lower Back Pain",
    timeAgo: "3 months ago",
    rating: 5,
  },
  {
    text: "Main dil se doctor sir ka dhanyavaad karta hoon. Pichhle lagbhag 5 mahino se mujhe neck pain tha aur uski wajah se mujhe anxiety aur bahut stress bhi rehta tha. Maine kai jagah treatment liya, lekin utna fayda nahi hua.",
    author: "Ajay Verma",
    condition: "Neck Pain",
    timeAgo: "2 months ago",
    rating: 5,
  },
  {
    text: "I sincerely thank you Dr. Lovish Nagpal for helping me overcome my knee pain with such patience and skill. Your personal attention and reassuring approach gave me not just physical relief, but also confidence and comfort. Kudos to you for being such a compassionate physiotherapist.",
    author: "Shalini Chhabra",
    condition: "Knee Pain",
    timeAgo: "6 months ago",
    rating: 5,
  },
  {
    text: "I recently consulted Dr. Lovish for my mother's physiotherapy treatment, and I must say it was an excellent experience.",
    author: "Mohit Garg",
    condition: "Physiotherapy",
    timeAgo: "7 months ago",
    rating: 5,
  },
  {
    text: "My mother got TKR surgery done. Best response so far — in 6 weeks my mother is able to do squats and all activities. Thank you Dr. Lovish for your kindness and results.",
    author: "Amrit Mandhan",
    condition: "TKR Rehabilitation",
    timeAgo: "6 months ago",
    rating: 5,
  },
  {
    text: "I'm suffering from Multiple Sclerosis (MS) disease. I was totally on bed and couldn't walk. Then my uncle told me about Lovish Nagpal physiotherapist. The improvement has been remarkable — I am deeply grateful.",
    author: "Mehak Kharbanda",
    condition: "Multiple Sclerosis",
    timeAgo: "9 months ago",
    rating: 5,
  },
  {
    text: "I had a wonderful experience with Dr. Lovish Nagpal, who treated my frozen shoulder. I started getting relief in the first three days. My wife had back pain, which got better within a week. I must compliment his knowledge about physiotherapy.",
    author: "Sumeet Chhabra",
    condition: "Frozen Shoulder & Back Pain",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    text: "I recently consulted Dr. Lovish for my and my mother's physiotherapy treatment, and I must say it was an excellent experience.",
    author: "Kritika Bajaj",
    condition: "Family Physiotherapy",
    timeAgo: "3 months ago",
    rating: 5,
  },
  {
    text: "Bdia kaam h ji… 3 sal purana pain do month me thik krdia 😇 Thanks Dr. Lovish!",
    author: "Hardik Saini",
    condition: "Chronic Pain Relief",
    timeAgo: "6 months ago",
    rating: 5,
  },
  {
    text: "Highly knowledgeable and competent Doctor who studies the issue to the core and carries the treatment with due patience and dedication. Highly Recommended.",
    author: "Heena Sharma",
    condition: "Physiotherapy",
    timeAgo: "4 months ago",
    rating: 5,
  },
  {
    text: "I'm a student suffering from cervical. Mujhe cervical ki problem ke wajah se headache aur chakkar aate the. Maine kai jagah physiotherapy karvai, CHD se bhi, lekin kahin se aaram nahi mila. Lekin yahan treatment se bahut relief mila.",
    author: "Sakshi",
    condition: "Cervical Spondylosis",
    timeAgo: "a year ago",
    rating: 5,
  },
  {
    text: "I can't thank Dr. Lovish enough for his incredible work on my knee replacement recovery. From day one, he provided expert guidance, personalized exercises, and constant motivation, making my rehabilitation smooth and effective.",
    author: "Yuvraj",
    condition: "Knee Replacement Recovery",
    timeAgo: "a year ago",
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

function AuthorAvatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
      <span className="text-sm font-sans font-semibold text-gold">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 640) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1));

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const translateX = current * (100 / perView);

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-ivory"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateSection>
          <SectionHeader
            overline="Patient Stories"
            heading="What Our Patients Say"
            description="Rated 5.0 on Google with over 52 reviews. Real outcomes from real patients across Yamuna Nagar and beyond."
          />
        </AnimateSection>

        {/* Carousel */}
        <div className="mt-12 relative px-10 sm:px-12">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ivory border border-beige shadow-sm flex items-center justify-center text-muted-text hover:border-gold hover:text-gold transition-colors duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Sliding window */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translateX}%)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{ width: `${100 / perView}%` }}
                  className="shrink-0 px-2 sm:px-3"
                >
                  <figure className="h-full flex flex-col p-6 rounded-sm bg-warm-white border border-beige select-none">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-4">
                      <Quote size={20} className="text-gold/25 shrink-0" aria-hidden="true" />
                      <div className="flex items-center gap-1.5">
                        <GoogleIcon />
                        <span className="text-[10px] text-muted-text/50 font-sans tracking-wide">
                          Google
                        </span>
                      </div>
                    </div>

                    {/* Review text */}
                    <blockquote className="flex-1 text-sm text-muted-text leading-relaxed italic mb-5">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <figcaption className="flex items-center gap-3">
                      <AuthorAvatar name={t.author} />
                      <div className="flex-1 min-w-0">
                        <StarRating count={t.rating} />
                        <p className="mt-1 font-heading text-sm text-rich-black truncate">
                          {t.author}
                        </p>
                        <p className="text-[11px] text-muted-text font-sans truncate">
                          {t.condition} &middot; {t.timeAgo}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ivory border border-beige shadow-sm flex items-center justify-center text-muted-text hover:border-gold hover:text-gold transition-colors duration-200"
            aria-label="Next review"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-7 flex justify-center items-center gap-1.5" role="tablist" aria-label="Review navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Review ${i + 1}`}
              onClick={() => setCurrent(Math.min(i, maxIndex))}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-beige hover:bg-gold/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
