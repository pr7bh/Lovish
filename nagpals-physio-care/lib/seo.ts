import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nagpalsphysiocare.com";

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
      streetAddress: "717, Mahavir Colony, East Bhatia Nagar",
      addressLocality: "Yamuna Nagar",
      addressRegion: "Haryana",
      postalCode: "135001",
      addressCountry: "IN",
    },
    telephone: "+91-72061-99132",
    sameAs: ["https://www.instagram.com/nagpals_physio_care"],
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
