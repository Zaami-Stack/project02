import { Crown, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

export function BillingCard({ profile }: { profile: UserProfile }) {
  const isPro = profile.plan === "pro";

  return (
    <Card id="billing">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant={isPro ? "accent" : "secondary"}>{isPro ? "Pro active" : "Free plan"}</Badge>
          {isPro ? <Crown className="h-5 w-5 text-accent" /> : <ShieldCheck className="h-5 w-5 text-primary" />}
        </div>
        <CardTitle>Billing and subscription</CardTitle>
        <CardDescription>
          {isPro
            ? "Manage your active Stripe subscription or open the billing portal."
            : "Upgrade to Pro for unlimited generations and priority prompt routing."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-[24px] border border-border/70 bg-background/75 p-5">
          <p className="text-sm font-medium">{isPro ? "Current plan: Pro" : "Current plan: Free"}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {isPro
              ? "Your workspace is unlocked for unlimited upgrades. Billing changes happen securely through Stripe."
              : "Free includes 10 server-enforced prompt upgrades per day. Upgrade when you need higher throughput."}
          </p>
        </div>
        {isPro ? (
          <form action="/api/billing/portal" method="post">
            <Button className="w-full" variant="outline" size="lg">
              Manage billing
            </Button>
          </form>
        ) : (
          <form action="/api/billing/checkout" method="post">
            <Button className="w-full" size="lg">
              Upgrade to Pro
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

