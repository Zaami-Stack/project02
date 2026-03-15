import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { getUserProfile } from "@/lib/prompts";

export async function SiteHeader() {
  const user = await getCurrentUser();
  const profile = user ? await getUserProfile(user.id) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/#features" className="transition hover:text-foreground">
            Features
          </Link>
          <Link href="/#pricing" className="transition hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="transition hover:text-foreground">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user && profile ? (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserMenu email={profile.email} plan={profile.plan} />
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Start free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
