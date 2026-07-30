import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { clinic } from "@/lib/data";

const ClinicCursor = dynamic(() => import("@/components/ClinicCursor"), {
  ssr: false,
});


// Self-hosted variable fonts (no runtime call to Google Fonts required —
// faster, more private builds, and resilient to restricted networks).
const fraunces = localFont({
  src: [
    { path: "../public/fonts/Fraunces[wght].ttf", style: "normal" },
    { path: "../public/fonts/Fraunces-Italic[wght].ttf", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = localFont({
  src: [{ path: "../public/fonts/Manrope[wght].ttf", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.ttf", weight: "400" },
    { path: "../public/fonts/IBMPlexMono-Medium.ttf", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gloweandsmileclinic.example"),
  title: "Dr Adidx Glow & Smile Clinic | Dental, Hair & Skin Care in Dahanu",
  description:
    "Dr. Aditya Bhange's Glow & Smile Clinic in Dahanu, Maharashtra offers gentle dental care, hair fall treatment, and skin & cosmetic care. 4.9★ rated, LGBTQ+ friendly. Book your visit today.",
  keywords: [
    "dentist Dahanu",
    "dental clinic Masoli",
    "skin clinic Dahanu",
    "hair treatment Dahanu",
    "Dr Aditya Bhange",
    "Glow and Smile Clinic",
    "cosmetic clinic Maharashtra",
  ],
  authors: [{ name: "Dr Adidx Glow & Smile Clinic" }],
  openGraph: {
    title: "Dr Adidx Glow & Smile Clinic",
    description:
      "Gentle, modern dental, hair, and skin care in Dahanu, Maharashtra. Rated 4.9★ by 54 patients.",
    url: "https://www.gloweandsmileclinic.example",
    siteName: "Dr Adidx Glow & Smile Clinic",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic"],
    name: clinic.name,
    image: "https://www.gloweandsmileclinic.example/og-image.jpg",
    telephone: "+91-86688-54063",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No 4, Avantika Apt, MSEB Road, Buddhadev Nagar",
      addressLocality: "Masoli, Dahanu",
      addressRegion: "Maharashtra",
      postalCode: "401602",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating,
      reviewCount: clinic.reviewCount,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    medicalSpecialty: ["Dentistry", "Dermatology", "Trichology"],
    physician: {
      "@type": "Physician",
      name: "Dr. Aditya Bhange",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} font-body antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-porcelain focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <ClinicCursor />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
