import { NextResponse } from "next/server";

import { historyQuerySchema } from "@/api/contracts";
import { getAccessContext } from "@/lib/access";
import { getUsageSummary } from "@/lib/prompts";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const parsed = historyQuerySchema.safeParse({
      fingerprint: url.searchParams.get("fingerprint")
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid fingerprint." }, { status: 400 });
    }

    const access = await getAccessContext();
    const usage = await getUsageSummary({
      fingerprint: parsed.data.fingerprint,
      plan: access.plan,
      accessSessionId: access.accessSessionId
    });

    return NextResponse.json({
      plan: access.plan,
      hasActiveCode: access.hasActiveCode,
      codeLabel: access.codeLabel,
      expiresAt: access.expiresAt,
      paypalUrl: access.paypalUrl,
      usage
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load access status." },
      { status: 500 }
    );
  }
}

