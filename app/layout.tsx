import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteHeader } from "@/components/site-header";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne"
});

const ADSENSE_PUBLISHER_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() || undefined;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

function getMetadataBase() {
  const fallback = "https://winklow.vercel.app";
  const value = process.env.NEXT_PUBLIC_APP_URL ?? fallback;

  try {
    return new URL(value);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${APP_NAME} | Prompt Studio`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_TAGLINE,
  category: "technology",
  applicationName: APP_NAME,
  keywords: [
    "Winklow",
    "Winklow AI",
    "AI prompt generator",
    "prompt engineering tool",
    "premium prompts",
    "AI SaaS",
    "prompt optimization",
    "Winklow"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: APP_NAME,
    title: `${APP_NAME} | Prompt Studio`,
    description: APP_TAGLINE,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} platform preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Prompt Studio`,
    description: APP_TAGLINE,
    images: ["/twitter-image"]
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg"
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? {
        google: GOOGLE_SITE_VERIFICATION
      }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1
    }
  },
  other: ADSENSE_PUBLISHER_ID
    ? {
        "google-adsense-account": ADSENSE_PUBLISHER_ID
      }
    : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${manrope.variable} ${syne.variable} font-sans`}>
        <AppProviders>
          <div className="relative min-h-screen">
            <SiteHeader />
            <main>{children}</main>
          </div>
          <Analytics />
        </AppProviders>
      </body>
    </html>
  );
}
