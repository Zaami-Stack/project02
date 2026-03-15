import { ArrowRight, Braces, DatabaseZap, ShieldCheck } from "lucide-react";

import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKETING_EXAMPLE } from "@/lib/constants";

export function TransformSection() {
  return (
    <section id="transformation" className="py-20">
      <div className="container">
        <SectionReveal>
          <div className="mb-8 flex flex-col gap-4">
            <Badge>Basic prompt in, premium prompt out</Badge>
            <div className="max-w-2xl space-y-3">
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Structure, strategy, and execution detail in one upgrade.
              </h2>
              <p className="text-lg leading-8 text-muted-foreground">
                PromptForge does not just make prompts longer. It turns vague requests into scoped instructions an AI can execute with more consistency.
              </p>
            </div>
          </div>
        </SectionReveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <SectionReveal delay={0.05}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Starter prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="rounded-[24px] border border-dashed border-border px-5 py-8 text-lg font-medium">
                  &quot;{MARKETING_EXAMPLE.input}&quot;
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Short inputs are fast to type, but they leave too much unspecified.</p>
                  <p>Models must guess architecture, UX, quality level, and deployment expectations.</p>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
          <div className="hidden items-center justify-center lg:flex">
            <div className="rounded-full border border-primary/20 bg-primary/10 p-4 text-primary shadow-[0_20px_60px_-30px_rgba(14,165,233,0.85)]">
              <ArrowRight className="h-8 w-8" />
            </div>
          </div>
          <SectionReveal delay={0.1}>
            <Card className="h-full border-primary/20 bg-primary/[0.04]">
              <CardHeader>
                <CardTitle>Premium prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-[24px] border border-primary/20 bg-background/80 p-5">
                  <p className="text-sm leading-7">{MARKETING_EXAMPLE.output}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { icon: Braces, label: "Roles and constraints" },
                    { icon: DatabaseZap, label: "Architecture and data model" },
                    { icon: ShieldCheck, label: "Security and deployment" }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
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
