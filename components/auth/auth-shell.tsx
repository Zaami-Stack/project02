import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AuthShell({
  title,
  description,
  footer,
  children
}: {
  title: string;
  description: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="container grid min-h-[calc(100vh-80px)] items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="section-shell relative hidden min-h-[640px] overflow-hidden lg:block">
        <div className="absolute inset-0 bg-noise-gradient opacity-100" />
        <div className="relative flex h-full flex-col justify-between p-8">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              Secure AI prompt workspace
            </Badge>
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight">
                Ship sharper prompts with SaaS-grade infrastructure.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Supabase auth, usage controls, history, favorites, and Stripe billing are already part of the flow.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Sparkles, label: "Premium prompt upgrades" },
              { icon: ShieldCheck, label: "Server-side abuse protection" },
              { icon: Zap, label: "Fast dashboard workflow" }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-[24px] border border-border/60 bg-background/70 p-5">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xl space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <Card className="overflow-hidden">
          <CardContent className="space-y-8 p-8">
            <Logo />
            <div className="space-y-3">
              <h2 className="font-display text-4xl font-semibold tracking-tight">{title}</h2>
              <p className="leading-7 text-muted-foreground">{description}</p>
            </div>
            {children}
            <div className="text-sm text-muted-foreground">{footer}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

