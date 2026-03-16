"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TAGLINE, MARKETING_EXAMPLE } from "@/lib/constants";

const valuePoints = [
  "Dynamic prompt intelligence engine",
  "Server-side limits and abuse protection",
  "No external AI API required"
];

export function HeroSection() {
  return (
    <section className="relative border-b border-border/80 py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.13),transparent_42%)]" />
      <div className="container relative">
        <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-7"
          >
            <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-[0.16em]">
              Winklow Platform
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Build expert-level prompts from any idea.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{APP_TAGLINE}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#transformation">View example</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {valuePoints.map((item) => (
                <div key={item} className="rounded-xl border border-border/80 bg-card/80 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <Card className="overflow-hidden border-border/85 bg-card/95 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.65)]">
              <CardHeader className="space-y-4 border-b border-border/70 pb-5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-[0.15em]">
                    Live transformation preview
                  </Badge>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-xl">Input to premium output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-5 sm:p-6">
                <div className="rounded-2xl border border-border/80 bg-background p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Input</p>
                  <p className="mt-2 text-base font-semibold">{MARKETING_EXAMPLE.input}</p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-secondary/50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Premium prompt result</p>
                  <p className="mt-2 line-clamp-6 text-sm leading-7 text-foreground">{MARKETING_EXAMPLE.output}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {["System role", "Requirements", "Architecture", "Security"].map((chip) => (
                    <div key={chip} className="rounded-lg border border-border/70 bg-background px-3 py-2 text-xs font-semibold">
                      {chip}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Usage is enforced server-side with fingerprint and IP protection.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
