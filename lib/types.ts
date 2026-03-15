export type PlanTier = "free" | "pro";

export type UserProfile = {
  id: string;
  email: string;
  plan: PlanTier;
  created_at: string;
};

export type PromptRecord = {
  id: string;
  user_id: string;
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

