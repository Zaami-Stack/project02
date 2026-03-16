import { Activity, History, LockKeyhole, Palette, Rocket, WandSparkles } from "lucide-react";

import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: WandSparkles,
    title: "Premium prompt generation",
    description: "Turn one-line ideas into structured prompts with requirements, constraints, UX, and delivery guidance."
  },
  {
    icon: LockKeyhole,
    title: "Server-enforced protection",
    description: "Usage limits live in Postgres with RLS, IP checks, browser fingerprinting, and zero client-side trust."
  },
  {
    icon: Activity,
    title: "Rate limiting and abuse signals",
    description: "Every generation is logged with multiple signals so free plans cannot burn through the service unnoticed."
  },
  {
    icon: History,
    title: "History and favorites",
    description: "Keep your best prompts close with saved history, favorite toggles, and quick-copy actions."
  },
  {
    icon: Palette,
    title: "Modern SaaS interface",
    description: "Responsive dashboard, dark mode, animated feedback, and clean production-ready design patterns."
  },
  {
    icon: Rocket,
    title: "Ready for Vercel",
    description: "Deploy with environment variables, Supabase SQL migration, and your PayPal + code fulfillment flow."
  }
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden border-y border-border/75 py-20">
      <div className="pointer-events-none absolute inset-0 edition-backdrop opacity-60" />
      <div className="container relative space-y-10">
        <SectionReveal>
          <div className="max-w-2xl space-y-4 rounded-3xl border border-border/80 bg-card/75 p-7 backdrop-blur sm:p-9">
            <Badge variant="secondary">Why teams choose Winklow</Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Designed for reliable output, not prompt theater.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Every layer is built for consistency: secure quotas, deterministic upgrades, and a workspace that stays fast as your usage grows.
            </p>
          </div>
        </SectionReveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <SectionReveal key={title} delay={index * 0.05}>
              <Card className="group h-full border-border/80 bg-card/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-36px_rgba(15,23,42,0.7)]">
                <CardHeader className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-secondary/70 text-foreground transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.12]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
