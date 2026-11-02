"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const ease: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

  const fade = (delay = 0) => ({
    initial: shouldReduce ? {} : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      className="relative min-h-screen flex items-center bg-ivory overflow-hidden"
      aria-label="Hero"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_30%,#E9DDC9_0%,transparent_70%)]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-beige/30 clip-path-[polygon(15%_0%,100%_0%,100%_100%,0%_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 pt-28 md:pt-36 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div {...fade(0)}>
              <span className="inline-flex items-center gap-3 text-xs font-sans font-medium tracking-widest text-gold uppercase mb-8">
                <span className="w-10 h-px bg-gold" />
                Trusted Physiotherapy Care
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] text-rich-black leading-[1.02] tracking-tight mb-7"
            >
              Move better.
              <br />
              <em className="not-italic text-gold">Live stronger.</em>
            </motion.h1>

            <motion.p
              {...fade(0.2)}
              className="text-base md:text-lg text-muted-text leading-relaxed max-w-lg mb-10"
            >
              Personalized physiotherapy and rehabilitation focused on helping
              you move with confidence and return to the activities you love.
            </motion.p>

            <motion.div
              {...fade(0.3)}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href="#contact"
                className="group inline-flex h-12 items-center gap-2 px-8 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-all duration-200"
              >
                Book an Appointment
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="#services"
                className="inline-flex h-12 items-center px-8 border border-rich-black/20 text-rich-black text-sm font-sans font-medium rounded-sm hover:border-gold hover:text-gold transition-colors duration-200"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual placeholder */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image box */}
              <div className="relative aspect-[4/5] bg-beige rounded-sm overflow-hidden border border-soft-beige">
                <Image
                  src="/images/hero-physio.jpg"
                  alt="Physiotherapist treating a patient — Nagpal's Physio Care"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 0px, 500px"
                />
                {/* Subtle overlay for text legibility on floating elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/20 to-transparent" />

                {/* Gold accent line */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gold" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-6 bg-white border border-beige rounded-sm px-5 py-4 shadow-lg max-w-[180px]">
                <p className="text-xs text-muted-text font-sans uppercase tracking-widest mb-1">
                  Speciality
                </p>
                <p className="font-heading text-base text-rich-black leading-tight">
                  Evidence-Based Physiotherapy
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!shouldReduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-muted-text" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
