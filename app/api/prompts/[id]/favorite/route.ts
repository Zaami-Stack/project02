import { NextResponse } from "next/server";

import { favoriteRequestSchema } from "@/api/contracts";
import { getCurrentUser } from "@/lib/auth";
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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const body = await request.json();
    const parsed = favoriteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid favorite payload." }, { status: 400 });
    }

    await setPromptFavorite({
      promptId: context.params.id,
      userId: user.id,
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

