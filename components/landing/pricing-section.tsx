import type { Route } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FREE_DAILY_LIMIT, PRO_MONTHLY_PRICE } from "@/lib/constants";

const plans: Array<{
  name: string;
  price: string;
  description: string;
  cta: string;
  href: Route;
  featured?: boolean;
  items: string[];
}> = [
  {
    name: "Free",
    price: "$0",
    description: "Explore the workflow with secure daily limits.",
    cta: "Create free account",
    href: "/signup",
    items: [`${FREE_DAILY_LIMIT} prompt upgrades per day`, "Prompt history", "Favorites", "Secure auth"]
  },
  {
    name: "Pro",
    price: `$${PRO_MONTHLY_PRICE}`,
    description: "For builders who generate at full speed.",
    cta: "Upgrade to Pro",
    href: "/signup",
    featured: true,
    items: ["Unlimited prompt upgrades", "Priority generation", "Billing portal", "Everything in Free"]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container space-y-10">
        <SectionReveal>
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Badge className="mx-auto">Simple pricing</Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Start free, upgrade when PromptForge becomes part of your workflow.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              One subscription tier, no confusing usage bundles, and clean server-side enforcement for fairness.
            </p>
          </div>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <SectionReveal key={plan.name} delay={index * 0.08}>
              <Card className={plan.featured ? "border-primary/30 bg-primary/[0.04]" : ""}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured ? <Badge variant="accent">Most popular</Badge> : null}
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-5xl font-semibold">{plan.price}</span>
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
                  <Button asChild size="lg" variant={plan.featured ? "default" : "outline"} className="w-full">
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
