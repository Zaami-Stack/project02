import { headers } from "next/headers";

export function getRequestIp() {
  const headerStore = headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const realIp = headerStore.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "0.0.0.0";
  }

  return realIp ?? "0.0.0.0";
}

export function getUserAgent() {
  return headers().get("user-agent") ?? "unknown";
}

