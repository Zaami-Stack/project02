import OpenAI from "openai";

import { getOpenAIEnv } from "@/lib/env";

let client: OpenAI | undefined;

export function getOpenAIClient() {
  if (!client) {
    const env = getOpenAIEnv();
    client = new OpenAI({
      apiKey: env.OPENAI_API_KEY
    });
  }

  return client;
}
