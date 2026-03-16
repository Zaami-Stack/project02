import type { Metadata } from "next";

import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TransformSection } from "@/components/landing/transform-section";
import { SiteFooter } from "@/components/site-footer";
import { AdsenseUnit } from "@/components/ads/adsense-unit";
import { APP_NAME, APP_TAGLINE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Prompt Generator for Production-Ready Output",
  description: APP_TAGLINE,
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://winklow.vercel.app";
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP;
  const middleAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE;
  const shouldRenderTopAd = Boolean(topAdSlot);
  const shouldRenderMiddleAd = Boolean(middleAdSlot);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: APP_NAME,
        url: siteUrl,
        sameAs: ["https://paypal.me/AnasZaami"]
      },
      {
        "@type": "WebSite",
        name: APP_NAME,
        url: siteUrl
      },
      {
        "@type": "SoftwareApplication",
        name: APP_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: [
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            category: "Free"
          },
          {
            "@type": "Offer",
            price: "10",
            priceCurrency: "USD",
            category: "Pro"
          }
        ],
        description: APP_TAGLINE
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
      <HeroSection />
      <TransformSection />
      {shouldRenderTopAd ? (
        <section className="py-8">
          <div className="container">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sponsored</p>
            <AdsenseUnit slot={topAdSlot} />
          </div>
        </section>
      ) : null}
      <FeaturesSection />
      <PricingSection />
      {shouldRenderMiddleAd ? (
        <section className="py-8">
          <div className="container">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sponsored</p>
            <AdsenseUnit slot={middleAdSlot} />
          </div>
        </section>
      ) : null}
      <FaqSection />
      <SiteFooter />
    </>
  );
}
