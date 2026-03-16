import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using ${APP_NAME}.`,
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <>
      <div className="container py-12">
        <article className="section-shell space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Legal</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: March 16, 2026</p>
          </header>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Acceptance of Terms</h2>
            <p className="leading-7 text-muted-foreground">
              By accessing or using {APP_NAME}, you agree to these terms. If you do not agree, you should not use the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Service Access</h2>
            <p className="leading-7 text-muted-foreground">
              Free usage is limited by daily server-enforced quotas. Pro usage is unlocked through valid access codes. We may
              limit or revoke access to protect service stability and prevent abuse.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Pro Purchases</h2>
            <p className="leading-7 text-muted-foreground">
              Pro access purchases are handled through PayPal and code fulfillment. You are responsible for using your code
              according to the provided activation limits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Acceptable Use</h2>
            <p className="leading-7 text-muted-foreground">
              You must not use the service for abuse, unauthorized access attempts, or illegal activity. Attempts to bypass
              usage limits or security controls may lead to blocked access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Disclaimer and Liability</h2>
            <p className="leading-7 text-muted-foreground">
              The platform is provided on an &quot;as is&quot; basis without warranties of uninterrupted availability or specific business
              outcomes. To the extent permitted by law, liability is limited for indirect or consequential losses.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold sm:text-2xl">Changes to Terms</h2>
            <p className="leading-7 text-muted-foreground">
              We may update these terms from time to time. Continued use after updates means you accept the revised terms.
            </p>
            <p className="text-sm font-medium">
              Questions:{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                Contact us
              </Link>
            </p>
          </section>
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
