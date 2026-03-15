import { z } from "zod";

const baseSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url()
});

const openAISchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini")
});

const adminSchema = z.object({
  SUPABASE_SERVICE_ROLE: z.string().min(1)
});

export function getBaseEnv() {
  return baseSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
  });
}

export function getOpenAIEnv() {
  return openAISchema.parse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL
  });
}

export function getAdminEnv() {
  return adminSchema.parse({
    SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE
  });
}
