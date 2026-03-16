import Link from "next/link";

import { Logo } from "@/components/logo";
import { APP_NAME, PAYPAL_ME_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Logo className="w-fit" />
          <p className="text-sm text-muted-foreground">Built for teams shipping serious AI outputs.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3 text-sm font-medium text-muted-foreground sm:w-auto sm:grid-cols-none sm:flex sm:flex-wrap sm:items-center sm:gap-6">
          <Link href="/#features" className="transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="/#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
          <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
            Buy Pro Code
          </a>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
      <div className="container mt-7 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {new Date().getFullYear()} {APP_NAME}
      </div>
    </footer>
  );
}
