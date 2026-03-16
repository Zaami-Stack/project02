import Link from "next/link";

import { Logo } from "@/components/logo";
import { PAYPAL_ME_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="w-fit" />
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#editions" className="transition-colors hover:text-foreground">
            Editions
          </Link>
          <Link href="#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
          <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            Buy Pro Code
          </a>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
