import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Conditions from "@/components/home/Conditions";
import Doctor from "@/components/home/Doctor";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import Contact from "@/components/home/Contact";
import { JsonLd } from "@/components/shared/JsonLd";
import { medicalClinicJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Nagpal's Physio Care — Physiotherapy Clinic in Yamuna Nagar, Haryana",
  },
  description:
    "Nagpal's Physio Care — expert physiotherapy clinic in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist, PGIMS Rohtak) specialises in pain relief, sports rehabilitation, post-surgical recovery and mobility care. Rated 5.0 on Google.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL ?? "https://nagpalsphysiocare.vercel.app",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={medicalClinicJsonLd()} />
      <Hero />
      <Services />
      <Conditions />
      <Doctor />
      <WhyChooseUs />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  );
}
