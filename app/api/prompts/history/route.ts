import { NextResponse } from "next/server";

import { historyQuerySchema } from "@/api/contracts";
import { getAccessContext } from "@/lib/access";
import { getPromptHistory } from "@/lib/prompts";

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
    const history = await getPromptHistory({
      fingerprint: parsed.data.fingerprint,
      accessSessionId: access.accessSessionId
    });

    return NextResponse.json({ history });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load prompt history." },
      { status: 500 }
    );
  }
}

