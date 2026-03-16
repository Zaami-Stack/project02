"use client";

import Link from "next/link";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Blocks, Gauge, Rocket, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Slide = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
};

const slides: Slide[] = [
  {
    icon: Gauge,
    title: "Directive Engine",
    subtitle: "Turn 7 words into a full production direction set.",
    description:
      "PromptForge restructures intent into roles, objectives, constraints, edge cases, and success criteria so AI systems stop guessing and start executing.",
    chips: ["Role assignment", "Output format contract", "Constraint map", "Complexity scaling"]
  },
  {
    icon: Blocks,
    title: "Blueprint Layers",
    subtitle: "Every prompt ships with architecture and execution context.",
    description:
      "Generate prompts that include UX expectations, API behavior, database shape, validation rules, and operational guidance in one coherent brief.",
    chips: ["UI/UX scope", "Data model", "Backend flow", "Testing checklist"]
  },
  {
    icon: ShieldCheck,
    title: "Guardrails by Default",
    subtitle: "Security and anti-abuse patterns are baked into each output.",
    description:
      "Your upgraded prompt can include auth boundaries, RLS hints, abuse prevention strategy, and failure handling so generated systems are safer from day one.",
    chips: ["Auth boundaries", "Rate limiting", "RLS strategy", "Failure states"]
  },
  {
    icon: Rocket,
    title: "Launch Instructions",
    subtitle: "Finish with deploy-ready execution steps.",
    description:
      "From environment variables to release checklist, PromptForge adds practical final-mile instructions so outputs are not only impressive but shippable.",
    chips: ["Deployment flow", "Env variables", "Monitoring notes", "Handoff summary"]
  }
];

const loopWords = [
  "Fast briefs",
  "Deep structure",
  "Premium output",
  "Launch ready",
  "Prompt reliability",
  "AI quality control"
];

export function EditionsSlidesSection() {
  const desktopRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(slides.length - 1) * 100}vw`]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="editions" className="relative overflow-hidden py-20">
      <div className="container relative z-10 space-y-7">
        <Badge variant="secondary" className="px-3 py-1">
          Winter Editions Style Experience
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Scroll-driven product story with cinematic slides.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            This section is built to feel like a launch keynote: immersive cards, sticky progression, fluid transitions, and high-contrast visuals.
          </p>
        </div>
        <div className="edition-marquee rounded-full border border-border/80 bg-card/75 py-2">
          <div className="edition-marquee-track flex min-w-max items-center gap-8 px-4">
            {[...loopWords, ...loopWords].map((word, idx) => (
              <span key={`${word}-${idx}`} className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div ref={desktopRef} className="relative mt-14 hidden lg:block" style={{ height: `${slides.length * 82}vh` }}>
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 edition-backdrop" />
          <motion.div style={{ x }} className="flex h-full">
            {slides.map(({ icon: Icon, title, subtitle, description, chips }) => (
              <article key={title} className="w-screen shrink-0 px-7 py-8 xl:px-12">
                <div className="slide-card mx-auto flex h-full w-full max-w-6xl flex-col justify-between rounded-[2rem] border border-white/25 bg-slate-950/85 p-10 text-white shadow-[0_45px_90px_-35px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                  <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />
                  <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
                  <div className="space-y-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="text-sm uppercase tracking-[0.16em] text-emerald-100/80">PromptForge Editions</p>
                    <h3 className="font-display text-5xl font-semibold leading-tight xl:text-6xl">{title}</h3>
                    <p className="max-w-3xl text-xl text-slate-200">{subtitle}</p>
                  </div>
                  <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
                    <p className="text-base leading-8 text-slate-200">{description}</p>
                    <div className="grid gap-3">
                      {chips.map((chip) => (
                        <div key={chip} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium">
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute bottom-8 left-1/2 h-1 w-[min(70vw,520px)] -translate-x-1/2 overflow-hidden rounded-full bg-white/20">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-emerald-300" />
          </div>
        </div>
      </div>

      <div className="container mt-10 lg:hidden">
        <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
          {slides.map(({ icon: Icon, title, subtitle, description, chips }) => (
            <article
              key={`mobile-${title}`}
              className="slide-card snap-start rounded-3xl border border-white/20 bg-slate-950/90 p-6 text-white shadow-xl"
              style={{ minWidth: "85vw" }}
            >
              <div className="space-y-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-3xl font-semibold">{title}</h3>
                <p className="text-sm text-slate-300">{subtitle}</p>
                <p className="text-sm leading-7 text-slate-200">{description}</p>
                <div className="grid gap-2">
                  {chips.map((chip) => (
                    <div key={`chip-mobile-${title}-${chip}`} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs">
                      {chip}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="accent">
            <Link href="/dashboard">Try the generator now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
