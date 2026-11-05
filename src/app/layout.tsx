import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://letsc-cleaning.com"),
  title: "Let's C | Premium Cleaning Services in Thamarassery, Kozhikode",
  description:
    "Professional residential cleaning, sofa extraction shampooing, mattress UV sanitization, and event cleaning in Thamarassery, Kozhikode, Kerala. 4.9-star Google rating.",
  keywords: [
    "Cleaning Services Kozhikode",
    "Home Cleaning Thamarassery",
    "Sofa Cleaning Calicut",
    "Deep Cleaning Kerala",
    "Mattress Sanitization",
    "Event Cleaning Kozhikode",
    "Let's C Cleaning",
  ],
  authors: [{ name: "Let's C Cleaning Services" }],
  creator: "Let's C",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://letsc-cleaning.com",
    title: "Let's C — Premium Cleaning Services | Thamarassery, Kozhikode",
    description:
      "Your space, beautifully clean. Meticulous home, sofa, mattress, and event cleaning services in Kozhikode, Kerala.",
    siteName: "Let's C Cleaning",
    images: [
      {
        url: "/images/brand-logo.png",
        width: 941,
        height: 491,
        alt: "Let's C - Beyond Cleaning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's C — Premium Cleaning Services in Kozhikode",
    description: "Professional cleaning services in Thamarassery and Kozhikode district.",
    images: ["/images/brand-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Let's C Cleaning Services",
  "image": "https://letsc-cleaning.com/images/brand-logo.png",
  "@id": "https://letsc-cleaning.com",
  "url": "https://letsc-cleaning.com",
  "telephone": "+919496000000",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Old Bus Stand",
    "addressLocality": "Thamarassery",
    "addressRegion": "Kerala",
    "postalCode": "673573",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.4172,
    "longitude": 75.9348
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "08:00",
    "closes": "20:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "20"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FBFBFD] text-black font-light antialiased selection:bg-[#03B9F4] selection:text-white">
        {children}
      </body>
    </html>
  );
}
