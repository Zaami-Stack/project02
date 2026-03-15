import Link from "next/link";

import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo className="w-fit" />
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="transition hover:text-foreground">
            Features
          </Link>
          <Link href="#pricing" className="transition hover:text-foreground">
            Pricing
          </Link>
          <Link href="#faq" className="transition hover:text-foreground">
            FAQ
          </Link>
          <Link href="/login" className="transition hover:text-foreground">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
