const encoder = new TextEncoder();

async function sha256(value: string) {
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  const bytes = Array.from(new Uint8Array(buffer));
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createBrowserFingerprint() {
  const parts = [
    navigator.userAgent,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.width,
    screen.height,
    screen.colorDepth,
    navigator.hardwareConcurrency ?? "na",
    navigator.platform,
    navigator.cookieEnabled
  ].join("|");

  return sha256(parts);
}

