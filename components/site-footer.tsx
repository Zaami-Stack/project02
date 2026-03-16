import Link from "next/link";

import { Logo } from "@/components/logo";
import { APP_NAME, PAYPAL_ME_URL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 py-10">
      <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-2">
          <Logo className="w-fit" />
          <p className="text-sm text-muted-foreground">Built for teams shipping serious AI outputs.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Product</p>
            <div className="space-y-2 text-sm font-medium text-muted-foreground">
              <Link href="/#features" className="block transition-colors hover:text-foreground">
                Features
              </Link>
              <Link href="/#pricing" className="block transition-colors hover:text-foreground">
                Pricing
              </Link>
              <Link href="/dashboard" className="block transition-colors hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Company</p>
            <div className="space-y-2 text-sm font-medium text-muted-foreground">
              <Link href="/#faq" className="block transition-colors hover:text-foreground">
                FAQ
              </Link>
              <Link href="/contact" className="block transition-colors hover:text-foreground">
                Contact
              </Link>
              <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer" className="block transition-colors hover:text-foreground">
                Buy Pro Code
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Legal</p>
            <div className="space-y-2 text-sm font-medium text-muted-foreground">
              <Link href="/privacy" className="block transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="block transition-colors hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-7 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {new Date().getFullYear()} {APP_NAME}
      </div>
    </footer>
  );
}
