import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read how ${APP_NAME} collects, uses, and protects your information.`,
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <>
      <div className="container py-12">
        <article className="section-shell space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Legal</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 16, 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Information We Collect</h2>
            <p className="leading-7 text-muted-foreground">
              {APP_NAME} stores prompt data and security signals needed to operate the platform. This can include prompt input,
              generated output, browser fingerprint identifiers, IP address, and timestamped usage events.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">How We Use Information</h2>
            <p className="leading-7 text-muted-foreground">
              We use collected data to provide prompt generation, maintain free/pro access limits, prevent abuse, troubleshoot
              incidents, and improve platform quality and reliability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Payments</h2>
            <p className="leading-7 text-muted-foreground">
              Pro access is purchased through PayPal. We do not store full payment card data inside the application database.
              Billing details are processed by PayPal under their policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Ad Partners</h2>
            <p className="leading-7 text-muted-foreground">
              {APP_NAME} may display Google AdSense units. Google and its partners may use cookies or similar technologies for
              ad delivery and measurement according to Google&apos;s policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Data Security</h2>
            <p className="leading-7 text-muted-foreground">
              We apply server-side validation, access controls, and abuse-protection mechanisms designed to reduce misuse and
              protect platform data. No method is guaranteed to be completely secure, but we continuously improve controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Your Choices</h2>
            <p className="leading-7 text-muted-foreground">
              You can stop using the service at any time. For questions about your data, contact us through the contact page.
            </p>
            <p className="text-sm font-medium">
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                Go to Contact
              </Link>
            </p>
          </section>
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
