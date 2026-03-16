import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
  process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "ca-pub-7336372781083421";

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
    default: `${APP_NAME} | AI Prompt Engineering Platform`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_TAGLINE,
  applicationName: APP_NAME,
  keywords: [
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
    title: `${APP_NAME} | AI Prompt Engineering Platform`,
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
    title: `${APP_NAME} | AI Prompt Engineering Platform`,
    description: APP_TAGLINE,
    images: ["/twitter-image"]
  },
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
  other: {
    "google-adsense-account": ADSENSE_PUBLISHER_ID
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${syne.variable} font-sans`}>
        <AppProviders>
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
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
