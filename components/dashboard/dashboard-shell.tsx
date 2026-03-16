"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { usePromptStore } from "@/hooks/use-prompt-store";
import { BillingCard } from "@/components/dashboard/billing-card";
import { PromptHistoryList } from "@/components/dashboard/prompt-history-list";
import { PromptWorkbench } from "@/components/dashboard/prompt-workbench";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import type {
  AccessStatus,
  PromptGenerationResponse,
  PromptHistoryResponse,
  PromptRecord,
  UsageSummary
} from "@/lib/types";
import { createBrowserFingerprint } from "@/utils/fingerprint";

const INITIAL_USAGE: UsageSummary = {
  usedToday: 0,
  dailyLimit: FREE_DAILY_LIMIT,
  remaining: FREE_DAILY_LIMIT,
  plan: "free"
};

const INITIAL_ACCESS: Omit<AccessStatus, "usage"> = {
  plan: "free",
  hasActiveCode: false,
  codeLabel: null,
  expiresAt: null,
  paypalUrl: "https://paypal.me/AnasZaami"
};

export function DashboardShell() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [history, setHistory] = useState<PromptRecord[]>([]);
  const [usage, setUsage] = useState<UsageSummary>(INITIAL_USAGE);
  const [access, setAccess] = useState(INITIAL_ACCESS);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const { activePrompt, setActivePrompt, setUsage: setStoreUsage } = usePromptStore();

  const loadDashboardData = useCallback(
    async (targetFingerprint: string) => {
      const [statusResponse, historyResponse] = await Promise.all([
        fetch(`/api/access/status?fingerprint=${encodeURIComponent(targetFingerprint)}`, {
          cache: "no-store"
        }),
        fetch(`/api/prompts/history?fingerprint=${encodeURIComponent(targetFingerprint)}`, {
          cache: "no-store"
        })
      ]);

      const statusPayload = (await statusResponse.json()) as AccessStatus | { error: string };
      const historyPayload = (await historyResponse.json()) as PromptHistoryResponse | { error: string };

      if (!statusResponse.ok || "error" in statusPayload) {
        throw new Error("error" in statusPayload ? statusPayload.error : "Unable to load access status.");
      }

      if (!historyResponse.ok || "error" in historyPayload) {
        throw new Error("error" in historyPayload ? historyPayload.error : "Unable to load prompt history.");
      }

      setUsage(statusPayload.usage);
      setStoreUsage(statusPayload.usage);
      setAccess({
        plan: statusPayload.plan,
        hasActiveCode: statusPayload.hasActiveCode,
        codeLabel: statusPayload.codeLabel,
        expiresAt: statusPayload.expiresAt,
        paypalUrl: statusPayload.paypalUrl
      });
      setHistory(historyPayload.history);

      setActivePrompt(historyPayload.history[0] ?? null);
    },
    [setActivePrompt, setStoreUsage]
  );

  useEffect(() => {
    if (activePrompt && !history.some((item) => item.id === activePrompt.id)) {
      setActivePrompt(history[0] ?? null);
    }
  }, [activePrompt, history, setActivePrompt]);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const generatedFingerprint = await createBrowserFingerprint();

        if (!mounted) {
          return;
        }

        setFingerprint(generatedFingerprint);
        await loadDashboardData(generatedFingerprint);
      } catch (error) {
        if (mounted) {
          toast.error(error instanceof Error ? error.message : "Unable to initialize the dashboard.");
        }
      } finally {
        if (mounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [loadDashboardData]);

  async function handlePromptGenerated(payload: PromptGenerationResponse) {
    setHistory((current) => [payload.prompt, ...current.filter((item) => item.id !== payload.prompt.id)]);
    setUsage(payload.usage);
    setStoreUsage(payload.usage);

    setAccess((current) => ({
      ...current,
      plan: payload.usage.plan,
      hasActiveCode: payload.usage.plan === "pro" ? current.hasActiveCode : false
    }));
  }

  async function handleToggleFavorite(promptId: string, isFavorite: boolean) {
    if (!fingerprint) {
      throw new Error("Secure fingerprint still loading.");
    }

    const response = await fetch(`/api/prompts/${promptId}/favorite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isFavorite,
        fingerprint
      })
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

  async function handleAccessChanged() {
    if (!fingerprint) {
      return;
    }

    await loadDashboardData(fingerprint);
  }

  return (
    <div className="space-y-8">
      <section className="section-shell overflow-hidden">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5">
            <Badge variant="outline">Winklow Workspace</Badge>
            <div className="space-y-4">
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Premium prompt operations, in one dashboard.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Start in free mode, save prompt history on this device, and unlock Pro instantly with your private code.
              </p>
            </div>
          </div>
          <div className="w-full rounded-2xl border border-border/80 bg-background p-5 lg:max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Device status</p>
            <p className="mt-2 text-lg font-semibold">
              {isBootstrapping ? "Initializing secure session..." : access.plan === "pro" ? "Pro unlocked" : "Free mode"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {fingerprint ? "Device fingerprint verified." : "Preparing secure fingerprint."}
            </p>
            <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <a href="#history">View history</a>
              </Button>
              <Button variant="ghost" asChild className="w-full sm:w-auto">
                <a href="#billing">Manage Pro access</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <PromptWorkbench fingerprint={fingerprint} onPromptGenerated={handlePromptGenerated} />
        <div className="space-y-8">
          <UsageMeter usage={usage} />
          <BillingCard
            plan={access.plan}
            hasActiveCode={access.hasActiveCode}
            codeLabel={access.codeLabel}
            expiresAt={access.expiresAt}
            paypalUrl={access.paypalUrl}
            fingerprint={fingerprint}
            onAccessChanged={handleAccessChanged}
          />
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
