import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Conditions from "@/components/home/Conditions";
import Doctor from "@/components/home/Doctor";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import Contact from "@/components/home/Contact";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Nagpal's Physio Care — Expert physiotherapy and rehabilitation by Dr. Lovish Nagpal. Pain relief, sports rehab, and mobility care.",
};

export default function HomePage() {
  return (
    <>
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
