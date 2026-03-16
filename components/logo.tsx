import type { Route } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

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
    <Link href={href} className={cn("group inline-flex items-center gap-2.5 sm:gap-3", className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/90 bg-foreground text-background transition group-hover:opacity-90">
        <span className="font-display text-sm font-semibold tracking-tight">WK</span>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-base font-semibold leading-none tracking-tight max-[360px]:hidden sm:text-lg">{APP_NAME}</span>
        <span className="hidden items-center gap-1 pt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:inline-flex">
          <Sparkles className="h-3 w-3" />
          Enterprise Prompt Studio
        </span>
      </span>
    </Link>
  );
}
