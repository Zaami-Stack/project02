import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { AppProviders } from "@/components/providers/app-providers";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

export const metadata: Metadata = {
  title: "PromptForge AI",
  description: "Turn rough AI ideas into premium prompts with secure SaaS-grade infrastructure."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${sora.variable} font-sans`}>
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

