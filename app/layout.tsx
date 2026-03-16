import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne"
});

export const metadata: Metadata = {
  title: "Winklow",
  description: "Generate production-grade premium prompts with a clean, modern SaaS workspace."
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
