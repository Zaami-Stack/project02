import { NextResponse } from "next/server";

import {
  getAccessCookieConfig,
  getAccessCookieName,
  getAccessTokenFromCookies,
  revokeAccessByToken
} from "@/lib/access";

export async function POST() {
  try {
    await revokeAccessByToken(getAccessTokenFromCookies());

    const response = NextResponse.json({ success: true });
    response.cookies.set(getAccessCookieName(), "", {
      ...getAccessCookieConfig(null),
      expires: new Date(0),
      maxAge: 0
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to revoke access." },
      { status: 500 }
    );
  }
}

