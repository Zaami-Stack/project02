import { Crown, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type { UsageSummary } from "@/lib/types";

export function UsageMeter({ usage }: { usage: UsageSummary }) {
  const progress = usage.dailyLimit ? Math.min((usage.usedToday / usage.dailyLimit) * 100, 100) : 100;

  return (
    <Card>
      <CardHeader className="space-y-3 border-b border-border/70 pb-5">
        <div className="flex items-center justify-between">
          <Badge variant={usage.plan === "pro" ? "accent" : "default"}>
            {usage.plan === "pro" ? "Pro plan" : "Free plan"}
          </Badge>
          {usage.plan === "pro" ? <Crown className="h-5 w-5 text-accent" /> : <Sparkles className="h-5 w-5 text-primary" />}
        </div>
        <CardTitle className="text-[1.35rem]">Daily prompt usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Used today</span>
            <span className="font-medium">
              {usage.plan === "pro" ? `${usage.usedToday} prompts` : `${usage.usedToday} / ${usage.dailyLimit ?? FREE_DAILY_LIMIT}`}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {usage.plan === "pro"
            ? "Unlimited generations are enabled, with priority routing for Pro code holders."
            : `${usage.remaining ?? 0} of your ${FREE_DAILY_LIMIT} secure daily prompt upgrades remain.`}
        </p>
      </CardContent>
    </Card>
  );
}
