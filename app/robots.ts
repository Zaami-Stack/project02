import type { MetadataRoute } from "next";

function getBaseUrl() {
  const fallback = "https://winklow.vercel.app";
  const value = process.env.NEXT_PUBLIC_APP_URL ?? fallback;

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}
