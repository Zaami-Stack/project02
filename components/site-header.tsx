import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PAYPAL_ME_URL } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/#features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#faq">FAQ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={PAYPAL_ME_URL} target="_blank" rel="noreferrer">
                  Buy Pro Code
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    </header>
  );
}
