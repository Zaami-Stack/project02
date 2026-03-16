"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_TAGLINE, MARKETING_EXAMPLE } from "@/lib/constants";

const loopingTags = [
  "Model-ready",
  "Enterprise prompting",
  "Structured instructions",
  "Security controls",
  "Deployment specs",
  "Reusable frameworks"
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/80">
      <div className="absolute inset-0 edition-backdrop" />
      <div className="hero-grid grid-fade absolute inset-0 opacity-40" />
      <div className="aurora-layer absolute -left-28 top-4 h-[28rem] w-[28rem] rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-400/30" />
      <div className="aurora-layer absolute -right-32 top-32 h-[26rem] w-[26rem] rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-400/20" />
      <div className="orb-float absolute left-[-5rem] top-[26%] h-40 w-40 rounded-full bg-white/50 blur-3xl dark:bg-slate-200/10" />
      <div className="orb-float-delayed absolute right-[-4rem] top-[58%] h-56 w-56 rounded-full bg-primary/30 blur-3xl" />

      <div className="container relative z-10 py-12 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="w-fit px-3 py-1 text-xs uppercase tracking-[0.18em]">
                Winklow Platform
              </Badge>
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Transform simple prompts into enterprise-grade AI instructions.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{APP_TAGLINE}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button variant="accent" size="lg" asChild className="w-full min-w-0 sm:w-auto sm:min-w-44">
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full min-w-0 sm:w-auto sm:min-w-44">
                <Link href="#transformation">See transformation</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { icon: CheckCircle2, label: "No signup required" },
                { icon: ShieldCheck, label: "Server-enforced protections" },
                { icon: Layers, label: "Enterprise product experience" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-border/80 bg-card/80 px-4 py-3 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="edition-marquee rounded-full border border-border/80 bg-card/80 py-2">
              <div className="edition-marquee-track flex min-w-max items-center gap-8 px-4">
                {[...loopingTags, ...loopingTags].map((tag, idx) => (
                  <span key={`${tag}-${idx}`} className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[34rem]">
            <motion.div
              initial={{ opacity: 0, y: 28, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="slide-card absolute left-0.5 top-8 w-[92%] rounded-3xl border border-white/25 bg-slate-950/85 p-5 text-white shadow-[0_35px_80px_-35px_rgba(15,23,42,0.85)] backdrop-blur-xl sm:left-2 sm:top-10 sm:w-[82%] sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">Input prompt</p>
                <WandSparkles className="h-4 w-4 text-emerald-300" />
              </div>
              <p className="mt-4 text-lg font-semibold sm:text-xl">{MARKETING_EXAMPLE.input}</p>
              <p className="mt-5 text-sm text-slate-300">The system captures intent and expands it into a production spec.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="slide-card absolute bottom-0.5 right-0 w-[96%] rounded-3xl border border-white/15 bg-slate-900/90 p-5 text-white shadow-[0_45px_100px_-42px_rgba(2,6,23,1)] sm:bottom-1 sm:w-[88%] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-200">Premium output</p>
                <Badge variant="outline" className="border-white/20 bg-white/10 text-[10px] text-white">
                  Structured
                </Badge>
              </div>
              <p className="mt-4 max-h-32 overflow-hidden text-xs leading-6 text-slate-200 sm:max-h-40 sm:text-sm sm:leading-7">
                {MARKETING_EXAMPLE.output}
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {["System role", "Requirements", "Architecture", "Security"].map((chip) => (
                  <div key={chip} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs">
                    {chip}
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="edition-spotlight absolute left-[8%] top-[12%] hidden h-24 w-24 sm:block" />
            <div className="edition-spotlight absolute right-[14%] top-[58%] hidden h-20 w-20 sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
