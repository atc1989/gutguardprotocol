import { Manrope } from "next/font/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import Analytics from "@/components/app/Analytics";
import CookieConsent from "@/components/app/CookieConsent";
import TikTokPixel from "@/components/app/TikTokPixel";
import Navbar from "@/components/layout/Navbar";
import { medicalWebPageSchema, siteConfig } from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

type RootLayoutProps = {
  children: ReactNode;
};

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const tikTokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Find out if chronic inflammation is already affecting you",
    description:
      "Upload your existing blood results. Get your Lifestyle Inflammation Score. A doctor reviews and assigns your protocol.",
    images: [
      {
        alt: "GutGuard Protocol",
        url: "/opengraph-image",
      },
    ],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Find out if chronic inflammation is already affecting you",
    description:
      "Upload your existing blood results. Get your Lifestyle Inflammation Score. A doctor reviews and assigns your protocol.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Script
          id="medical-webpage-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalWebPageSchema),
          }}
        />
        <Analytics measurementId={measurementId} />
        <TikTokPixel pixelId={tikTokPixelId} />
        <Navbar />
        <div id="root">{children}</div>
        <CookieConsent />
      </body>
    </html>
  );
}
