import { revalidatePath } from "next/cache";

import { FREE_DAILY_LIMIT, PROMPT_ENGINEERING_SYSTEM_MESSAGE } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_OPENAI_MODEL } from "@/lib/constants";
import { UsageLimitError } from "@/lib/errors";
import { getOpenAIClient } from "@/lib/openai";
import type { PlanTier, PromptGenerationResponse, PromptRecord, UsageSummary, UserProfile } from "@/lib/types";

type BeginPromptGenerationResult = {
  allowed: boolean;
  log_id: string | null;
  plan: PlanTier;
  used_today: number;
  daily_limit: number | null;
  reason: string | null;
};

export async function getUserProfile(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, plan, created_at")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Unable to load user profile: ${error.message}`);
  }

  return data as UserProfile;
}

export async function getPromptHistory(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("prompts")
    .select("id, user_id, input_prompt, generated_prompt, is_favorite, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    throw new Error(`Unable to load prompt history: ${error.message}`);
  }

  return (data ?? []) as PromptRecord[];
}

export async function getUsageSummary(userId: string, plan?: PlanTier) {
  const profile = plan ? ({ plan } as Pick<UserProfile, "plan">) : await getUserProfile(userId);
  const supabase = createSupabaseAdminClient();
  const now = new Date();
  const utcDayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const { count, error } = await supabase
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "completed")
    .gte("created_at", utcDayStart.toISOString());

  if (error) {
    throw new Error(`Unable to load usage summary: ${error.message}`);
  }

  const usedToday = count ?? 0;
  const dailyLimit = profile.plan === "pro" ? null : FREE_DAILY_LIMIT;

  return {
    usedToday,
    dailyLimit,
    remaining: dailyLimit === null ? null : Math.max(dailyLimit - usedToday, 0),
    plan: profile.plan
  } satisfies UsageSummary;
}

export async function generatePremiumPrompt({
  userId,
  inputPrompt,
  fingerprint,
  ipAddress,
  userAgent,
  priority = false
}: {
  userId: string;
  inputPrompt: string;
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
  priority?: boolean;
}): Promise<PromptGenerationResponse> {
  const supabase = createSupabaseAdminClient();

  const { data: beginResult, error: beginError } = await supabase.rpc("begin_prompt_generation", {
    p_user_id: userId,
    p_ip: ipAddress,
    p_fingerprint: fingerprint,
    p_user_agent: userAgent
  });

  if (beginError) {
    throw new Error(`Unable to enforce prompt usage: ${beginError.message}`);
  }

  const usageGate = (beginResult?.[0] ?? null) as BeginPromptGenerationResult | null;

  if (!usageGate?.allowed || !usageGate.log_id) {
    const reason = usageGate?.reason ?? "Daily generation limit reached.";
    throw new UsageLimitError(reason);
  }

  const openai = getOpenAIClient();

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_OPENAI_MODEL,
      temperature: priority ? 0.55 : 0.7,
      messages: [
        {
          role: "system",
          content: PROMPT_ENGINEERING_SYSTEM_MESSAGE
        },
        {
          role: "user",
          content: inputPrompt
        }
      ]
    });

    const generatedPrompt = completion.choices[0]?.message?.content?.trim();

    if (!generatedPrompt) {
      throw new Error("The AI provider returned an empty prompt.");
    }

    const { data: promptRow, error: promptError } = await supabase
      .from("prompts")
      .insert({
        user_id: userId,
        input_prompt: inputPrompt,
        generated_prompt: generatedPrompt
      })
      .select("id, user_id, input_prompt, generated_prompt, is_favorite, created_at")
      .single();

    if (promptError) {
      throw new Error(`Unable to save generated prompt: ${promptError.message}`);
    }

    const { error: logError } = await supabase
      .from("usage_logs")
      .update({
        status: "completed",
        prompt_id: promptRow.id
      })
      .eq("id", usageGate.log_id);

    if (logError) {
      throw new Error(`Unable to finalize usage log: ${logError.message}`);
    }

    revalidatePath("/dashboard");

    const usage: UsageSummary = {
      usedToday: usageGate.used_today + 1,
      dailyLimit: usageGate.daily_limit,
      remaining:
        usageGate.daily_limit === null
          ? null
          : Math.max((usageGate.daily_limit ?? FREE_DAILY_LIMIT) - (usageGate.used_today + 1), 0),
      plan: usageGate.plan
    };

    return {
      prompt: promptRow as PromptRecord,
      usage
    };
  } catch (error) {
    await supabase
      .from("usage_logs")
      .update({
        status: "failed",
        failure_reason: error instanceof Error ? error.message : "Unknown generation failure"
      })
      .eq("id", usageGate.log_id);

    throw error;
  }
}

export async function setPromptFavorite({
  promptId,
  userId,
  isFavorite
}: {
  promptId: string;
  userId: string;
  isFavorite: boolean;
}) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("prompts")
    .update({ is_favorite: isFavorite })
    .eq("id", promptId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Unable to update favorite status: ${error.message}`);
  }

  revalidatePath("/dashboard");
}

export async function syncUserPlanFromSubscription(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status, plan")
    .eq("user_id", userId)
    .in("status", ["active", "trialing", "past_due"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to sync user plan: ${error.message}`);
  }

  const plan: PlanTier = data?.plan === "pro" ? "pro" : "free";

  const { error: profileError } = await supabase.from("users").update({ plan }).eq("id", userId);

  if (profileError) {
    throw new Error(`Unable to update user plan: ${profileError.message}`);
  }

  return plan;
}
