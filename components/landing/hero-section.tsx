import Link from "next/link";
import { ArrowRight, CheckCircle2, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_TAGLINE, MARKETING_EXAMPLE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Badge variant="outline" className="border-primary/25 bg-primary/10 text-primary">
              Premium prompt engineering for builders, founders, and teams
            </Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Forge rough AI ideas into prompts that feel deployment-ready.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{APP_TAGLINE}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start building free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#transformation">See the transformation</Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "10 secure free upgrades daily",
                "History, favorites, and billing",
                "Supabase auth and server-side limits"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="section-shell relative overflow-hidden border-white/15 bg-slate-950 text-slate-50">
            <div className="absolute inset-0 bg-noise-gradient opacity-100" />
            <CardContent className="relative space-y-6 p-6 md:p-8">
              <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                <span>Live transformation preview</span>
                <WandSparkles className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Basic prompt</p>
                  <p className="mt-3 text-lg font-medium">{MARKETING_EXAMPLE.input}</p>
                </div>
                <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-5 shadow-[0_25px_80px_-50px_rgba(34,211,238,0.9)]">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/80">PromptForge output</p>
                  <p className="mt-3 text-sm leading-7 text-slate-100">{MARKETING_EXAMPLE.output}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

