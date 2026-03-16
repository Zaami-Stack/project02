import { FAQ_ITEMS } from "@/lib/constants";
import { SectionReveal } from "@/components/landing/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="container space-y-10">
        <SectionReveal>
          <div className="max-w-2xl space-y-4 rounded-3xl border border-border/80 bg-card p-5 sm:p-8 lg:p-9">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Straight answers before you launch.
            </h2>
          </div>
        </SectionReveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {FAQ_ITEMS.map((item, index) => (
            <SectionReveal key={item.question} delay={index * 0.04}>
              <Card className="h-full border-border/80">
                <CardContent className="space-y-3 p-6">
                  <h3 className="font-display text-xl font-semibold">{item.question}</h3>
                  <p className="leading-7 text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
