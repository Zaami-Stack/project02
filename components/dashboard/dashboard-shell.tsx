"use client";

import { useEffect, useState } from "react";

import { usePromptStore } from "@/hooks/use-prompt-store";
import { BillingCard } from "@/components/dashboard/billing-card";
import { PromptHistoryList } from "@/components/dashboard/prompt-history-list";
import { PromptWorkbench } from "@/components/dashboard/prompt-workbench";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PromptGenerationResponse, PromptRecord, UsageSummary, UserProfile } from "@/lib/types";

export function DashboardShell({
  profile,
  initialHistory,
  initialUsage
}: {
  profile: UserProfile;
  initialHistory: PromptRecord[];
  initialUsage: UsageSummary;
}) {
  const [history, setHistory] = useState(initialHistory);
  const [usage, setUsage] = useState(initialUsage);
  const { activePrompt, setActivePrompt, setUsage: setStoreUsage } = usePromptStore();

  useEffect(() => {
    setStoreUsage(initialUsage);

    if (!activePrompt && initialHistory.length > 0) {
      setActivePrompt(initialHistory[0]);
    }
  }, [activePrompt, initialHistory, initialUsage, setActivePrompt, setStoreUsage]);

  function handlePromptGenerated(payload: PromptGenerationResponse) {
    setHistory((current) => [payload.prompt, ...current.filter((item) => item.id !== payload.prompt.id)]);
    setUsage(payload.usage);
    setStoreUsage(payload.usage);
  }

  async function handleToggleFavorite(promptId: string, isFavorite: boolean) {
    const response = await fetch(`/api/prompts/${promptId}/favorite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isFavorite })
    });

    const payload = (await response.json()) as { success?: boolean; error?: string };

    if (!response.ok || !payload.success) {
      throw new Error(payload.error ?? "Unable to update favorite.");
    }

    setHistory((current) =>
      current.map((prompt) => (prompt.id === promptId ? { ...prompt, is_favorite: isFavorite } : prompt))
    );

    if (activePrompt?.id === promptId) {
      setActivePrompt({ ...activePrompt, is_favorite: isFavorite });
    }
  }

  return (
    <div className="space-y-8">
      <section className="section-shell overflow-hidden">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              PromptForge workspace
            </Badge>
            <div className="space-y-3">
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Build premium prompts on demand.</h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Start with a rough idea, then refine, save, favorite, and reuse your strongest prompts from one secure dashboard.
              </p>
            </div>
          </div>
          <div className="rounded-[24px] border border-border/70 bg-background/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
            <p className="mt-2 text-lg font-semibold">{profile.email}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <a href="#history">View history</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#billing">Manage plan</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <PromptWorkbench onPromptGenerated={handlePromptGenerated} />
        <div className="space-y-8">
          <UsageMeter usage={usage} />
          <BillingCard profile={profile} />
        </div>
      </div>
      <PromptHistoryList
        history={history}
        activePromptId={activePrompt?.id ?? null}
        onSelect={setActivePrompt}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
