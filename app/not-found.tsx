import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">404</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight">Page not found</h1>
        <p className="max-w-md text-lg leading-8 text-muted-foreground">
          The page you asked for does not exist, but your prompt workspace is still intact.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
