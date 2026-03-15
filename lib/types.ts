export type PlanTier = "free" | "pro";

export type PromptRecord = {
  id: string;
  input_prompt: string;
  generated_prompt: string;
  is_favorite: boolean;
  created_at: string;
};

export type UsageSummary = {
  usedToday: number;
  dailyLimit: number | null;
  remaining: number | null;
  plan: PlanTier;
};

export type PromptGenerationResponse = {
  prompt: PromptRecord;
  usage: UsageSummary;
};

export type AccessStatus = {
  plan: PlanTier;
  hasActiveCode: boolean;
  codeLabel: string | null;
  expiresAt: string | null;
  usage: UsageSummary;
  paypalUrl: string;
};

export type PromptHistoryResponse = {
  history: PromptRecord[];
};
