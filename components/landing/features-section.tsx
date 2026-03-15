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
    description: "Deploy with environment variables, Supabase SQL migrations, and Stripe billing configuration."
  }
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container space-y-10">
        <SectionReveal>
          <div className="max-w-2xl space-y-4">
            <Badge variant="secondary">Why teams choose PromptForge</Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for shipping real work, not just prettier prompts.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              The platform combines secure SaaS foundations with a prompt engine that can support app builds, plans, stories, and complex generation workflows.
            </p>
          </div>
        </SectionReveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <SectionReveal key={title} delay={index * 0.05}>
              <Card className="h-full">
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
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

