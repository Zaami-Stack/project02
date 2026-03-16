import Link from "next/link";
import { ArrowRight, CheckCircle2, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_TAGLINE, MARKETING_EXAMPLE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 py-20 sm:py-24">
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="container relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <Badge variant="outline" className="w-fit">
              Premium prompt design workspace
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl">
                Enterprise-grade prompts from simple ideas.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{APP_TAGLINE}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#transformation">See live transformation</Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "No signup required",
                "Secure free daily quota",
                "Pro code unlock via PayPal"
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border/80 bg-card/80 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-border/85 bg-card">
            <CardContent className="space-y-5 p-5 sm:p-6">
              <div className="flex items-center justify-between rounded-lg border border-border/80 bg-secondary/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <span>Transformation Preview</span>
                <WandSparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl border border-border/80 bg-background p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Input</p>
                  <p className="mt-3 text-base font-semibold">{MARKETING_EXAMPLE.input}</p>
                </div>
                <div className="rounded-xl border border-primary/25 bg-primary/[0.07] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Output</p>
                  <p className="mt-3 text-sm leading-7">{MARKETING_EXAMPLE.output}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
