"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "cn";
import { clinic } from "@/lib/clinic-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/conditions", label: "Conditions" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          menuOpen
            ? "bg-transparent border-transparent"
            : scrolled
            ? "bg-ivory/95 backdrop-blur-sm border-b border-beige/80 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" onClick={close} className="flex items-center gap-3 shrink-0 relative z-50">
            <Image
              src={menuOpen ? "/images/nagpals-physio-logo-dark.png" : "/images/nagpals-physio-logo.png"}
              alt="Nagpal's Physio Care"
              width={44}
              height={44}
              style={{ width: 44, height: 44 }}
              className="rounded-sm object-contain"
              priority
            />
            <div className="hidden sm:block leading-tight">
              <p className={cn(
                "font-heading text-base transition-colors duration-300",
                menuOpen ? "text-ivory" : "text-rich-black"
              )}>
                Nagpal&apos;s Physio Care
              </p>
              <p className={cn(
                "text-[10px] tracking-wide transition-colors duration-300",
                menuOpen ? "text-ivory/50" : "text-muted-text"
              )}>
                Pain Relief. Rehabilitation. Mobility Care.
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.slice(1).map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm font-sans transition-colors duration-200",
                    isActive ? "text-gold" : "text-rich-black/70 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex h-10 items-center px-6 bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
            >
              Book Appointment
            </Link>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "md:hidden relative z-50 p-2 -mr-1 transition-colors duration-300",
                menuOpen ? "text-ivory" : "text-rich-black"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Full-page mobile menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-rich-black md:hidden flex flex-col"
          >
            {/* Nav links — vertically centered */}
            <div className="flex-1 flex flex-col justify-center px-8 pt-16">
              <nav className="flex flex-col">
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.35, delay: 0.08 + i * 0.07, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className="group flex items-center gap-5 py-4 border-b border-ivory/8 last:border-0"
                      >
                        <span className={cn(
                          "h-px bg-gold transition-all duration-300 shrink-0",
                          isActive ? "w-8" : "w-0 group-hover:w-8"
                        )} />
                        <span className={cn(
                          "font-heading text-[2.5rem] leading-none transition-colors duration-200",
                          isActive ? "text-gold" : "text-ivory/70 group-hover:text-ivory"
                        )}>
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom contact strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="px-8 pb-10 pt-8 border-t border-ivory/10"
            >
              <div className="flex flex-col gap-3 mb-6">
                <a
                  href={clinic.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors duration-200"
                >
                  <MessageCircle size={15} className="text-gold shrink-0" />
                  <span className="text-sm font-sans">{clinic.whatsapp}</span>
                </a>
                <a
                  href={clinic.phoneHref}
                  className="flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors duration-200"
                >
                  <Phone size={15} className="text-gold shrink-0" />
                  <span className="text-sm font-sans">{clinic.phone}</span>
                </a>
              </div>

              <Link
                href="/contact"
                onClick={close}
                className="flex h-12 items-center justify-center bg-gold text-white text-sm font-sans font-medium rounded-sm hover:bg-gold-light transition-colors duration-200"
              >
                Book Appointment
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
