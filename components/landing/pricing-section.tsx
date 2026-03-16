import type { Route } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FREE_DAILY_LIMIT, PAYPAL_ME_URL, PRO_MONTHLY_PRICE } from "@/lib/constants";

const plans: Array<{
  name: string;
  price: string;
  description: string;
  cta: string;
  href?: Route;
  externalHref?: string;
  featured?: boolean;
  items: string[];
}> = [
  {
    name: "Free",
    price: "$0",
    description: "Start instantly with secure daily limits and no account setup.",
    cta: "Open free dashboard",
    href: "/dashboard",
    items: [`${FREE_DAILY_LIMIT} prompt upgrades per day`, "Prompt history", "Favorites", "Device-based access"]
  },
  {
    name: "Pro",
    price: `$${PRO_MONTHLY_PRICE}`,
    description: "Buy once monthly, receive a private access code, unlock instantly.",
    cta: "Buy Pro code",
    externalHref: PAYPAL_ME_URL,
    featured: true,
    items: ["Unlimited prompt upgrades", "Priority generation", "Code-based unlock", "Everything in Free"]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-20">
      <div className="container space-y-10">
        <SectionReveal>
          <div className="mx-auto max-w-2xl space-y-4 rounded-3xl border border-border/80 bg-card p-7 text-center sm:p-9">
            <Badge className="mx-auto">Simple pricing</Badge>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              One product. Two clear modes.
            </h2>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Free starts instantly. Pro activates in seconds with your private access code after payment.
            </p>
          </div>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.08}>
              <Card
                className={
                  plan.featured
                    ? "border-primary/30 bg-primary/[0.05] shadow-[0_24px_48px_-34px_rgba(16,185,129,0.5)]"
                    : "border-border/80"
                }
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured ? <Badge variant="accent">Preferred</Badge> : null}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-4xl font-semibold sm:text-5xl">{plan.price}</span>
                    <span className="pb-1 text-sm text-muted-foreground">{plan.name === "Pro" ? "/ month" : ""}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  {plan.externalHref ? (
                    <Button asChild size="lg" variant={plan.featured ? "default" : "outline"} className="w-full">
                      <a href={plan.externalHref} target="_blank" rel="noreferrer">
                        {plan.cta}
                      </a>
                    </Button>
                  ) : (
                    <Button asChild size="lg" variant={plan.featured ? "default" : "outline"} className="w-full">
                      <Link href={plan.href!}>{plan.cta}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
