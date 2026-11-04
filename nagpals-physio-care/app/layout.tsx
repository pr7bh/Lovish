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
    "Expert physiotherapy in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist) treats pain, sports injuries & post-surgical recovery. Rated 5.0★ on Google. Book today.",
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
      "Expert physiotherapy in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist) treats pain, sports injuries & post-surgical recovery. Rated 5.0★ on Google.",
    siteName: "Nagpal's Physio Care",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    description:
      "Expert physiotherapy in Yamuna Nagar, Haryana. Dr. Lovish Nagpal (BPT Gold Medalist) treats pain, sports injuries & post-surgical recovery. Rated 5.0★ on Google.",
  },
  verification: {
    google: "todQ74XVPamLodbcXO_Z9k044SgYvubjYMqyP4h3CZg",
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
