import { ArrowRight, Braces, DatabaseZap, ShieldCheck } from "lucide-react";

import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_EXAMPLE } from "@/lib/constants";

export function TransformSection() {
  return (
    <section id="transformation" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 edition-backdrop opacity-80" />
      <div className="container relative">
        <SectionReveal>
          <div className="mb-10 space-y-6 rounded-3xl border border-border/80 bg-card/70 p-7 backdrop-blur sm:p-10">
            <Badge className="w-fit">How prompt upgrading works</Badge>
            <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-3">
                <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  From rough sentence to execution-ready instruction set.
                </h2>
                <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Winklow converts vague ideas into guided briefs that AI can execute with consistency and technical depth.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {["Input", "Expansion", "Delivery"].map((step, idx) => (
                  <div key={step} className="rounded-xl border border-border/80 bg-background/80 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Step {idx + 1}</p>
                    <p className="mt-2 text-sm font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <SectionReveal delay={0.05}>
            <Card className="h-full border-border/80 bg-card/85 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle>Starter prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="rounded-2xl border border-dashed border-border px-5 py-8 text-lg font-medium">
                  &quot;{MARKETING_EXAMPLE.input}&quot;
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Short prompts are fast, but they leave delivery quality undefined.</p>
                  <p>The model has to guess scope, constraints, and expected output depth.</p>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
          <div className="hidden items-center justify-center lg:flex">
            <div className="rounded-2xl border border-border/80 bg-card p-4 text-foreground shadow-sm backdrop-blur">
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>
          <SectionReveal delay={0.1}>
            <Card className="h-full border-primary/30 bg-primary/[0.08] shadow-[0_30px_60px_-34px_rgba(16,185,129,0.65)]">
              <CardHeader>
                <CardTitle>Premium prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-2xl border border-primary/25 bg-background/90 p-5">
                  <p className="text-sm leading-7">{MARKETING_EXAMPLE.output}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { icon: Braces, label: "Roles and constraints" },
                    { icon: DatabaseZap, label: "Architecture and data model" },
                    { icon: ShieldCheck, label: "Security and deployment" }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="rounded-2xl border border-border/70 bg-background/80 p-4">
                      <Icon className="h-5 w-5 text-primary" />
                      <p className="mt-3 text-sm font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
