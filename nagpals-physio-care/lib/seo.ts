import type { Metadata } from "next";
import { clinic } from "@/lib/clinic-config";

const BASE_URL = clinic.baseUrl;

export function meta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Nagpal's Physio Care`,
      description,
      url,
      siteName: "Nagpal's Physio Care",
      type: "website",
    },
  };
}

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Nagpal's Physio Care",
    description:
      "Expert physiotherapy and rehabilitation services by Dr. Lovish Nagpal. Specializing in pain relief, sports rehabilitation, and mobility care.",
    medicalSpecialty: "Physiotherapy",
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    telephone: clinic.phone,
    email: clinic.email,
    sameAs: [clinic.instagramUrl],
    url: BASE_URL,
    priceRange: "$$",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}
