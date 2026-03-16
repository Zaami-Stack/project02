import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PAYPAL_ME_URL } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer">
              Buy Pro Code
            </a>
          </Button>
          <Button variant="accent" asChild className="px-3 max-[380px]:px-2.5 sm:px-5">
            <Link href="/dashboard">
              <span className="max-[380px]:hidden sm:hidden">Dashboard</span>
              <span className="hidden max-[380px]:inline">Open</span>
              <span className="hidden sm:inline">Open dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border/70 md:hidden">
        <nav className="container no-scrollbar flex items-center gap-5 overflow-x-auto py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <Link href="/#features" className="shrink-0 transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/#pricing" className="shrink-0 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="shrink-0 transition-colors hover:text-foreground">
            FAQ
          </Link>
          <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer" className="shrink-0 transition-colors hover:text-foreground">
            Buy Pro
          </a>
          <Link href="/contact" className="shrink-0 transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
