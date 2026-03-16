import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { APP_NAME, PAYPAL_ME_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${APP_NAME} for support, billing, or business inquiries.`,
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <div className="container py-12">
        <article className="section-shell space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Support</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Contact {APP_NAME}</h1>
            <p className="leading-7 text-muted-foreground">
              For billing, support, or partnership requests, use one of the channels below.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-background p-6">
              <h2 className="font-display text-2xl font-semibold">Billing Support</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                For Pro code purchases or payment questions, contact us through PayPal.
              </p>
              <p className="mt-4 text-sm font-medium">
                <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">
                  Open PayPal Contact
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background p-6">
              <h2 className="font-display text-2xl font-semibold">Technical Support</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                For bugs, access issues, or technical problems, submit details through GitHub issues.
              </p>
              <p className="mt-4 text-sm font-medium">
                <a
                  href="https://github.com/Zaami-Stack/project02/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Open GitHub Issues
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Response Time</h2>
            <p className="leading-7 text-muted-foreground">
              Most requests receive a response within 1 to 3 business days. Include your access code label or recent request
              details to help us resolve issues faster.
            </p>
            <p className="text-sm text-muted-foreground">
              For legal details, read our{" "}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
