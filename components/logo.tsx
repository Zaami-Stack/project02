import type { Route } from "next";
import Link from "next/link";

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
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring/70 sm:gap-3",
        className
      )}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 p-[1px] shadow-[0_10px_28px_-14px_rgba(16,185,129,0.85)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.02]">
        <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[11px] bg-slate-950 text-white dark:bg-slate-900">
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.35),transparent_42%)]" />
          <span className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-md" />
          <span className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.08em]">WK</span>
        </span>
      </span>
      <span className="flex flex-col">
        <span className="font-display text-base font-semibold leading-none tracking-tight max-[380px]:hidden sm:text-lg">{APP_NAME}</span>
        <span className="hidden pt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:inline">
          Prompt Studio
        </span>
      </span>
    </Link>
  );
}
