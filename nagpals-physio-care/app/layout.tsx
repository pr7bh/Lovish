import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://nagpalsphysiocare.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    template: "%s | Nagpal's Physio Care",
  },
  description:
    "Nagpal's Physio Care — expert physiotherapy clinic in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist, PGIMS Rohtak) provides personalized treatment for pain relief, sports rehabilitation, post-surgical recovery, and mobility care.",
  keywords: [
    "physiotherapy Yamuna Nagar",
    "physiotherapist Yamuna Nagar",
    "Nagpal's Physio Care",
    "Dr. Lovish Nagpal",
    "physiotherapy clinic Haryana",
    "sports rehabilitation",
    "pain relief physiotherapy",
    "post surgical rehabilitation",
    "manual therapy",
    "mobility care",
  ],
  openGraph: {
    type: "website",
    title: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    description:
      "Expert physiotherapy clinic in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist) — pain relief, sports rehab, post-surgical recovery.",
    siteName: "Nagpal's Physio Care",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    description:
      "Expert physiotherapy clinic in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist) — pain relief, sports rehab, post-surgical recovery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
