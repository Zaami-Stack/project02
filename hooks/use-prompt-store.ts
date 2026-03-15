"use client";

import { create } from "zustand";

import type { PromptRecord, UsageSummary } from "@/lib/types";

type PromptStore = {
  input: string;
  activePrompt: PromptRecord | null;
  usage: UsageSummary | null;
  isGenerating: boolean;
  setInput: (input: string) => void;
  setActivePrompt: (prompt: PromptRecord | null) => void;
  setUsage: (usage: UsageSummary | null) => void;
  setGenerating: (isGenerating: boolean) => void;
  resetOutput: () => void;
};

export const usePromptStore = create<PromptStore>((set) => ({
  input: "",
  activePrompt: null,
  usage: null,
  isGenerating: false,
  setInput: (input) => set({ input }),
  setActivePrompt: (activePrompt) => set({ activePrompt }),
  setUsage: (usage) => set({ usage }),
  setGenerating: (isGenerating) => set({ isGenerating }),
  resetOutput: () => set({ activePrompt: null })
}));

