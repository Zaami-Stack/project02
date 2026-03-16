"use client";

import { useEffect, useRef } from "react";

type AdsenseUnitProps = {
  slot: string | undefined;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "ca-pub-7336372781083421";

export function AdsenseUnit({ slot, className, format = "auto" }: AdsenseUnitProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!PUBLISHER_ID || !slot || initializedRef.current) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initializedRef.current = true;
    } catch {
      // Ignore ad client runtime errors to avoid breaking app UX.
    }
  }, [slot]);

  if (!PUBLISHER_ID || !slot) {
    return null;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block min-h-[100px] w-full overflow-hidden rounded-xl border border-border/70 bg-card/70"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
