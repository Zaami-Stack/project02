import { NextResponse } from "next/server";

import { promptRequestSchema } from "@/api/contracts";
import { UsageLimitError } from "@/lib/errors";
import { getCurrentUser } from "@/lib/auth";
import { generatePremiumPrompt, getUserProfile } from "@/lib/prompts";
import { getRequestIp, getUserAgent } from "@/lib/request";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const profile = await getUserProfile(user.id);
    const body = await request.json();
    const parsed = promptRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid prompt payload." }, { status: 400 });
    }

    const payload = await generatePremiumPrompt({
      userId: user.id,
      inputPrompt: parsed.data.prompt,
      fingerprint: parsed.data.fingerprint,
      ipAddress: getRequestIp(),
      userAgent: getUserAgent(),
      priority: profile.plan === "pro"
    });

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof UsageLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to generate prompt." },
      { status: 500 }
    );
  }
}
