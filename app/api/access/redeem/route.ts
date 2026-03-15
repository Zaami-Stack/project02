import { NextResponse } from "next/server";

import { redeemCodeRequestSchema } from "@/api/contracts";
import {
  getAccessCookieConfig,
  getAccessCookieName,
  redeemAccessCode
} from "@/lib/access";
import { getRequestIp, getUserAgent } from "@/lib/request";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = redeemCodeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid code payload." }, { status: 400 });
    }

    const redemption = await redeemAccessCode({
      code: parsed.data.code,
      fingerprint: parsed.data.fingerprint,
      ipAddress: getRequestIp(),
      userAgent: getUserAgent()
    });

    const response = NextResponse.json({
      success: true,
      plan: redemption.plan,
      expiresAt: redemption.expiresAt,
      codeLabel: redemption.codeLabel
    });

    response.cookies.set(
      getAccessCookieName(),
      redemption.token,
      getAccessCookieConfig(redemption.expiresAt)
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to redeem code." },
      { status: 400 }
    );
  }
}

