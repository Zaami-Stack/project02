import crypto from "node:crypto";
import { cookies } from "next/headers";

import { PAYPAL_ME_URL } from "@/lib/constants";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { PlanTier } from "@/lib/types";

const ACCESS_COOKIE_NAME = "pf_access_token";
const ACCESS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type AccessSessionRow = {
  id: string;
  status: "active" | "revoked" | "expired";
  expires_at: string | null;
  access_codes: {
    plan: PlanTier;
    is_active: boolean;
    expires_at: string | null;
    code_label: string | null;
  } | null;
};

type ClaimAccessCodeRow = {
  allowed: boolean;
  reason: string | null;
  plan: PlanTier;
  access_session_id: string | null;
  session_expires_at: string | null;
  code_label: string | null;
};

export type AccessContext = {
  plan: PlanTier;
  hasActiveCode: boolean;
  accessSessionId: string | null;
  accessTokenHash: string | null;
  codeLabel: string | null;
  expiresAt: string | null;
  paypalUrl: string;
};

export function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function generateAccessToken() {
  return crypto.randomBytes(32).toString("hex");
}

function isExpired(isoDate: string | null) {
  if (!isoDate) {
    return false;
  }

  return new Date(isoDate).getTime() <= Date.now();
}

export function getAccessTokenFromCookies() {
  return cookies().get(ACCESS_COOKIE_NAME)?.value ?? null;
}

async function getSessionFromTokenHash(tokenHash: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("access_sessions")
    .select("id, status, expires_at, access_codes(plan, is_active, expires_at, code_label)")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to validate access session: ${error.message}`);
  }

  return (data ?? null) as AccessSessionRow | null;
}

function isSessionActive(session: AccessSessionRow | null) {
  if (!session || session.status !== "active" || !session.access_codes) {
    return false;
  }

  if (!session.access_codes.is_active || isExpired(session.access_codes.expires_at) || isExpired(session.expires_at)) {
    return false;
  }

  return true;
}

export async function getAccessContext(): Promise<AccessContext> {
  const token = getAccessTokenFromCookies();

  if (!token) {
    return {
      plan: "free",
      hasActiveCode: false,
      accessSessionId: null,
      accessTokenHash: null,
      codeLabel: null,
      expiresAt: null,
      paypalUrl: PAYPAL_ME_URL
    };
  }

  const tokenHash = hashValue(token);
  const session = await getSessionFromTokenHash(tokenHash);

  if (!session || !isSessionActive(session) || !session.access_codes) {
    return {
      plan: "free",
      hasActiveCode: false,
      accessSessionId: null,
      accessTokenHash: null,
      codeLabel: null,
      expiresAt: null,
      paypalUrl: PAYPAL_ME_URL
    };
  }

  const accessCode = session.access_codes;

  return {
    plan: accessCode.plan,
    hasActiveCode: true,
    accessSessionId: session.id,
    accessTokenHash: tokenHash,
    codeLabel: accessCode.code_label ?? null,
    expiresAt: session.expires_at,
    paypalUrl: PAYPAL_ME_URL
  };
}

export async function redeemAccessCode({
  code,
  fingerprint,
  ipAddress,
  userAgent
}: {
  code: string;
  fingerprint: string;
  ipAddress: string;
  userAgent: string;
}) {
  const supabase = createSupabaseAdminClient();
  const token = generateAccessToken();
  const tokenHash = hashValue(token);

  const { data, error } = await supabase.rpc("claim_access_code", {
    p_code: code,
    p_token_hash: tokenHash,
    p_ip: ipAddress,
    p_fingerprint: fingerprint,
    p_user_agent: userAgent
  });

  if (error) {
    throw new Error(`Unable to redeem access code: ${error.message}`);
  }

  const result = (data?.[0] ?? null) as ClaimAccessCodeRow | null;

  if (!result?.allowed || !result.access_session_id) {
    throw new Error(result?.reason ?? "Invalid or expired access code.");
  }

  return {
    token,
    plan: result.plan,
    expiresAt: result.session_expires_at,
    accessSessionId: result.access_session_id,
    codeLabel: result.code_label
  };
}

export async function revokeAccessByToken(token: string | null) {
  if (!token) {
    return;
  }

  const supabase = createSupabaseAdminClient();
  const tokenHash = hashValue(token);

  const { error } = await supabase
    .from("access_sessions")
    .update({ status: "revoked" })
    .eq("token_hash", tokenHash)
    .eq("status", "active");

  if (error) {
    throw new Error(`Unable to revoke access session: ${error.message}`);
  }
}

export function getAccessCookieConfig(expiresAt: string | null) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ACCESS_COOKIE_MAX_AGE_SECONDS,
    expires: expiresAt ? new Date(expiresAt) : undefined
  };
}

export function getAccessCookieName() {
  return ACCESS_COOKIE_NAME;
}
