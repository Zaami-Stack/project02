import { NextResponse } from "next/server";

import { promptRequestSchema } from "@/api/contracts";
import { getAccessContext } from "@/lib/access";
import { UsageLimitError } from "@/lib/errors";
import { generatePremiumPrompt } from "@/lib/prompts";
import { getRequestIp, getUserAgent } from "@/lib/request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = promptRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid prompt payload." }, { status: 400 });
    }

    const access = await getAccessContext();

    const payload = await generatePremiumPrompt({
      inputPrompt: parsed.data.prompt,
      fingerprint: parsed.data.fingerprint,
      ipAddress: getRequestIp(),
      userAgent: getUserAgent(),
      accessTokenHash: access.accessTokenHash
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
