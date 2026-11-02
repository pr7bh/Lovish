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

export const metadata: Metadata = {
  title: {
    default: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    template: "%s | Nagpal's Physio Care",
  },
  description:
    "Expert physiotherapy and rehabilitation services by Dr. Lovish Nagpal. Personalized treatment plans for pain relief, sports injuries, post-surgical recovery, and improved mobility.",
  keywords: [
    "physiotherapy",
    "physiotherapist",
    "rehabilitation",
    "pain relief",
    "sports injury",
    "Dr. Lovish Nagpal",
    "Nagpal's Physio Care",
    "manual therapy",
    "mobility care",
  ],
  openGraph: {
    type: "website",
    title: "Nagpal's Physio Care — Pain Relief. Rehabilitation. Mobility Care.",
    description:
      "Expert physiotherapy and rehabilitation services by Dr. Lovish Nagpal.",
    siteName: "Nagpal's Physio Care",
  },
  robots: {
    index: true,
    follow: true,
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
