import { EditionsSlidesSection } from "@/components/landing/editions-slides-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TransformSection } from "@/components/landing/transform-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EditionsSlidesSection />
      <TransformSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <SiteFooter />
    </>
  );
}
