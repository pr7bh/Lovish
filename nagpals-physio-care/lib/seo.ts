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
  const fullTitle = `${title} | Nagpal's Physio Care`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Nagpal's Physio Care",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function medicalClinicJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Nagpal's Physio Care",
    description:
      "Expert physiotherapy and rehabilitation clinic in Yamuna Nagar, Haryana. Founded by Dr. Lovish Nagpal (BPT Gold Medalist, PGIMS Rohtak). Specializing in pain relief, sports rehabilitation, post-surgical recovery, and mobility care.",
    medicalSpecialty: "Physiotherapy",
    url: BASE_URL,
    telephone: clinic.phone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(clinic.googleRating.score),
      reviewCount: String(clinic.googleRating.count),
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: {
      "@type": "City",
      name: "Yamuna Nagar",
    },
    founder: {
      "@type": "Person",
      name: "Dr. Lovish Nagpal",
      jobTitle: "Physiotherapist",
      description: "BPT (Gold Medalist), PGIMS Rohtak. Specialist in sports rehabilitation, neurological physiotherapy, and post-surgical care.",
      worksFor: {
        "@type": "MedicalClinic",
        name: "Nagpal's Physio Care",
      },
    },
    sameAs: [clinic.instagramUrl],
    priceRange: "$$",
    image: `${BASE_URL}/opengraph-image`,
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
