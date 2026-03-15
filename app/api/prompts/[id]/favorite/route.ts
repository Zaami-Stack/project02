import { NextResponse } from "next/server";

import { favoriteRequestSchema } from "@/api/contracts";
import { getAccessContext } from "@/lib/access";
import { setPromptFavorite } from "@/lib/prompts";

export async function PATCH(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    const body = await request.json();
    const parsed = favoriteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid favorite payload." }, { status: 400 });
    }

    const access = await getAccessContext();

    await setPromptFavorite({
      promptId: context.params.id,
      fingerprint: parsed.data.fingerprint,
      accessSessionId: access.accessSessionId,
      isFavorite: parsed.data.isFavorite
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update favorite." },
      { status: 500 }
    );
  }
}
