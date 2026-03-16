"use client";

import { Copy, WandSparkles } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePromptStore } from "@/hooks/use-prompt-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { PromptGenerationResponse } from "@/lib/types";

export function PromptWorkbench({
  fingerprint,
  onPromptGenerated
}: {
  fingerprint: string | null;
  onPromptGenerated: (payload: PromptGenerationResponse) => void;
}) {
  const { input, setInput, activePrompt, isGenerating, setGenerating, setActivePrompt, resetOutput } = usePromptStore();
  const { copied, copy } = useCopyToClipboard();
  const [isPending, startTransition] = useTransition();

  async function handleGenerate() {
    if (input.trim().length < 5) {
      toast.error("Enter a prompt with at least 5 characters.");
      return;
    }

    setGenerating(true);
    resetOutput();

    try {
      if (!fingerprint) {
        throw new Error("Preparing your secure device session. Please try again in a second.");
      }

      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: input,
          fingerprint
        })
      });

      const payload = (await response.json()) as PromptGenerationResponse | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Generation failed.");
      }

      setActivePrompt(payload.prompt);
      onPromptGenerated(payload);
      toast.success("Premium prompt ready.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to generate prompt.");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    if (!activePrompt) {
      return;
    }

    startTransition(async () => {
      await copy(activePrompt.generated_prompt);
      toast.success("Prompt copied.");
    });
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-3 border-b border-border/70 pb-5">
        <CardTitle>Prompt Editor</CardTitle>
        <CardDescription>
          Describe the output you want. Winklow will turn it into a premium prompt with role, requirements, architecture, UX, security, and delivery guidance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
          <div className="space-y-4">
            <label htmlFor="prompt-input" className="text-sm font-medium">
              Your starter prompt
            </label>
            <Textarea
              id="prompt-input"
              placeholder="Example: build a CRM for freelance designers"
              className="min-h-[220px]"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="w-full sm:w-auto">
              {isGenerating ? <Spinner /> : <WandSparkles className="h-4 w-4" />}
              Upgrade prompt
            </Button>
          </div>
          <div className="rounded-2xl border border-border/80 bg-background p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Premium output</p>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Structured output format</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy} disabled={!activePrompt || isPending}>
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="mt-4 min-h-[280px] max-h-[560px] overflow-auto rounded-xl border border-dashed border-border/70 bg-card/60 p-5">
              {isGenerating ? (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-secondary p-3 text-foreground">
                    <Spinner className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Forging your premium prompt</p>
                    <p className="max-w-md text-sm leading-6 text-muted-foreground">
                      We are expanding scope, architecture, UX, security, and launch guidance into a cleaner expert-level instruction set.
                    </p>
                  </div>
                </div>
              ) : activePrompt ? (
                <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-foreground">{activePrompt.generated_prompt}</pre>
              ) : (
                <div className="flex h-full min-h-[240px] items-center justify-center text-center text-sm leading-6 text-muted-foreground">
                  Your optimized prompt will appear here after generation.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
