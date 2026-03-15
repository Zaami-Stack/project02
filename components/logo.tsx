import type { Route } from "next";
import Link from "next/link";
import { Hammer, Sparkles } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/utils/cn";

export function Logo({
  className,
  href = "/"
}: {
  className?: string;
  href?: Route;
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-3", className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-400 to-amber-300 text-slate-950 shadow-[0_18px_36px_-18px_rgba(56,189,248,0.85)] transition group-hover:scale-[1.03]">
        <Hammer className="h-5 w-5" />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-lg font-semibold tracking-tight">{APP_NAME}</span>
        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          Premium Prompt Studio
        </span>
      </span>
    </Link>
  );
}
