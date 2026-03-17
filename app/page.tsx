import type { Metadata } from "next";
import Script from "next/script";

import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TransformSection } from "@/components/landing/transform-section";
import { SiteFooter } from "@/components/site-footer";
import { AdsenseUnit } from "@/components/ads/adsense-unit";
import { APP_NAME, APP_TAGLINE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: `${APP_NAME} | AI Prompt Studio`
  },
  description: `Official ${APP_NAME} website. ${APP_TAGLINE}`,
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://winklow.vercel.app").replace(/\/$/, "");
  const siteLogo = `${siteUrl}/icon.svg`;
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();
  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP?.trim();
  const middleAdSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE?.trim();
  const shouldRenderTopAd = Boolean(topAdSlot);
  const shouldRenderMiddleAd = Boolean(middleAdSlot);
  const shouldLoadAdsScript = Boolean(publisherId && (shouldRenderTopAd || shouldRenderMiddleAd));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: APP_NAME,
        alternateName: "Winklow AI",
        url: siteUrl,
        logo: siteLogo,
        sameAs: ["https://paypal.me/AnasZaami"]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: APP_NAME,
        alternateName: "Winklow",
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#application`,
        name: APP_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        brand: {
          "@id": `${siteUrl}/#organization`
        },
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
      {shouldLoadAdsScript ? (
        <Script
          id="adsense-script-home"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
          crossOrigin="anonymous"
        />
      ) : null}
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
