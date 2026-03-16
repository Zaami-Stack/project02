import { revalidatePath } from "next/cache";

import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { UsageLimitError } from "@/lib/errors";
import { buildIntelligentPrompt } from "@/lib/prompt-intelligence";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PlanTier, PromptGenerationResponse, PromptRecord, UsageSummary } from "@/lib/types";

type BeginPromptGenerationResult = {
  allowed: boolean;
  log_id: string | null;
  plan: PlanTier;
  used_today: number;
  daily_limit: number | null;
  reason: string | null;
  access_session_id: string | null;
};

export async function getPromptHistory({
  fingerprint,
  accessSessionId
}: {
  fingerprint: string;
  accessSessionId: string | null;
}) {
  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from("prompts")
    .select("id, input_prompt, generated_prompt, is_favorite, created_at")
    .order("created_at", { ascending: false })
    .limit(40);

  if (accessSessionId) {
    query = query.or(`owner_fingerprint.eq.${fingerprint},access_session_id.eq.${accessSessionId}`);
  } else {
    query = query.eq("owner_fingerprint", fingerprint);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Unable to load prompt history: ${error.message}`);
  }

  return (data ?? []) as PromptRecord[];
}

export async function getUsageSummary({
  fingerprint,
  plan,
  accessSessionId
}: {
  fingerprint: string;
  plan: PlanTier;
  accessSessionId: string | null;
}) {
  const supabase = createSupabaseAdminClient();
  const now = new Date();
  const utcDayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  let query = supabase
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("status", "completed")
    .gte("created_at", utcDayStart.toISOString());

  if (plan === "pro" && accessSessionId) {
    query = query.eq("access_session_id", accessSessionId);
  } else {
    query = query.eq("fingerprint", fingerprint);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error(`Unable to load usage summary: ${error.message}`);
  }

  const usedToday = count ?? 0;
  const dailyLimit = plan === "pro" ? null : FREE_DAILY_LIMIT;

  return {
    usedToday,
    dailyLimit,
    remaining: dailyLimit === null ? null : Math.max(dailyLimit - usedToday, 0),
    plan
  } satisfies UsageSummary;
}

export async function generatePremiumPrompt({
  inputPrompt,
  fingerprint,
  ipAddress,
  userAgent,
  accessTokenHash
}: {
  inputPrompt: string;
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
  accessTokenHash: string | null;
}): Promise<PromptGenerationResponse> {
  const supabase = createSupabaseAdminClient();

  const { data: beginResult, error: beginError } = await supabase.rpc("begin_prompt_generation", {
    p_ip: ipAddress,
    p_fingerprint: fingerprint,
    p_access_token_hash: accessTokenHash,
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

  try {
    const generatedPrompt = buildIntelligentPrompt({
      inputPrompt,
      plan: usageGate.plan,
      variationKey: `${fingerprint}:${usageGate.log_id}`
    });

    const { data: promptRow, error: promptError } = await supabase
      .from("prompts")
      .insert({
        owner_fingerprint: fingerprint,
        access_session_id: usageGate.access_session_id,
        ip: ipAddress,
        input_prompt: inputPrompt,
        generated_prompt: generatedPrompt
      })
      .select("id, input_prompt, generated_prompt, is_favorite, created_at")
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
  fingerprint,
  accessSessionId,
  isFavorite
}: {
  promptId: string;
  fingerprint: string;
  accessSessionId: string | null;
  isFavorite: boolean;
}) {
  const supabase = createSupabaseAdminClient();
  const { data: promptRow, error: promptError } = await supabase
    .from("prompts")
    .select("id, owner_fingerprint, access_session_id")
    .eq("id", promptId)
    .maybeSingle();

  if (promptError) {
    throw new Error(`Unable to load prompt record: ${promptError.message}`);
  }

  if (!promptRow) {
    throw new Error("Prompt not found.");
  }

  const ownsByFingerprint = promptRow.owner_fingerprint === fingerprint;
  const ownsByCodeSession = Boolean(accessSessionId && promptRow.access_session_id === accessSessionId);

  if (!ownsByFingerprint && !ownsByCodeSession) {
    throw new Error("You do not have permission to modify this prompt.");
  }

  const { error } = await supabase.from("prompts").update({ is_favorite: isFavorite }).eq("id", promptId);

  if (error) {
    throw new Error(`Unable to update favorite status: ${error.message}`);
  }

  revalidatePath("/dashboard");
}
