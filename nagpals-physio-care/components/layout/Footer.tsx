import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CurrentYear } from "@/components/shared/CurrentYear";
import { clinic } from "@/lib/clinic-config";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/conditions", label: "Conditions Treated" },
  { href: "/about", label: "About Dr. Nagpal" },
  { href: "/#testimonials", label: "Patient Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Sports Rehabilitation",
  "Post-Surgical Rehab",
  "Dry Needling",
  "Cupping Therapy",
  "Neurological Physiotherapy",
  "Pediatric Rehab",
];

export default function Footer() {
  return (
    <footer className="bg-rich-black text-ivory/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/nagpals-physio-logo-dark.png"
                alt="Nagpal's Physio Care"
                width={40}
                height={40}
                style={{ width: 40, height: 40 }}
                className="rounded-sm object-contain"
              />
              <span className="font-heading text-base text-ivory leading-tight">
                Nagpal&apos;s Physio Care
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ivory/60 mb-2">
              {clinic.tagline}
            </p>
            <p className="text-sm leading-relaxed text-ivory/60 mb-6">
              Expert physiotherapy in Yamuna Nagar, Haryana.
            </p>
            <a
              href={clinic.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-ivory/50 hover:text-gold transition-colors"
              aria-label="Follow Nagpal's Physio Care on Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              {clinic.instagram}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-lg text-ivory mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg text-ivory mb-5">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-ivory/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-heading text-lg text-ivory mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-ivory/60">
                  {clinic.address.street}
                  <br />
                  {clinic.address.city}, {clinic.address.state} {clinic.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                <a href={clinic.phoneHref} className="text-sm text-ivory/60 hover:text-gold transition-colors">
                  {clinic.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold shrink-0" />
                <a href={clinic.emailHref} className="text-sm text-ivory/60 hover:text-gold transition-colors break-all">
                  {clinic.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-ivory/60">
                  {clinic.hours.weekdays}
                  <br />
                  {clinic.hours.sunday}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ivory/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40">
            © <CurrentYear /> Nagpal&apos;s Physio Care. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-ivory/40 hover:text-ivory/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-ivory/40 hover:text-ivory/70 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
