"use client";

import { Heart, Search, Star } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/utils/date";
import { cn } from "@/utils/cn";
import type { PromptRecord } from "@/lib/types";

type HistoryTab = "recent" | "favorites";

export function PromptHistoryList({
  history,
  activePromptId,
  onSelect,
  onToggleFavorite
}: {
  history: PromptRecord[];
  activePromptId: string | null;
  onSelect: (prompt: PromptRecord) => void;
  onToggleFavorite: (promptId: string, isFavorite: boolean) => Promise<void>;
}) {
  const [tab, setTab] = useState<HistoryTab>("recent");
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const base = tab === "favorites" ? history.filter((prompt) => prompt.is_favorite) : history;
    const query = search.trim().toLowerCase();

    if (!query) {
      return base;
    }

    return base.filter((prompt) => {
      return (
        prompt.input_prompt.toLowerCase().includes(query) ||
        prompt.generated_prompt.toLowerCase().includes(query)
      );
    });
  }, [history, search, tab]);

  return (
    <Card id="history">
      <CardHeader className="space-y-4 border-b border-border/70 pb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Prompt history</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prompts"
              className="pl-10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={(value) => setTab(value as HistoryTab)}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="recent" className="flex-1 sm:flex-none">
              Recent
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex-1 sm:flex-none">
              Favorites
            </TabsTrigger>
          </TabsList>
          <TabsContent value={tab}>
            <div className="mt-4 space-y-4">
              {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
                  {tab === "favorites" ? "No favorites yet." : "Your generated prompts will appear here."}
                </div>
              ) : (
                filtered.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={cn(
                      "rounded-xl border border-border/80 bg-background p-4 transition sm:p-5",
                      activePromptId === prompt.id && "border-primary/35 bg-primary/[0.04]"
                    )}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <button
                        type="button"
                        className="flex-1 text-left"
                        onClick={() => onSelect(prompt)}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{formatDate(prompt.created_at)}</p>
                        <h3 className="mt-2 text-base font-semibold sm:text-lg">{prompt.input_prompt}</h3>
                        <p className="mt-2 line-clamp-3 break-words text-sm leading-7 text-muted-foreground">{prompt.generated_prompt}</p>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="self-end sm:self-auto"
                        disabled={isPending}
                        onClick={() =>
                          startTransition(async () => {
                            try {
                              await onToggleFavorite(prompt.id, !prompt.is_favorite);
                              toast.success(prompt.is_favorite ? "Removed from favorites." : "Added to favorites.");
                            } catch (error) {
                              toast.error(error instanceof Error ? error.message : "Unable to update favorite.");
                            }
                          })
                        }
                      >
                        {prompt.is_favorite ? <Heart className="h-4 w-4 fill-current text-accent" /> : <Star className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
