"use client";

import Link from "next/link";
import { CreditCard, LayoutDashboard, LogOut, Sparkles, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu({
  email,
  plan
}: {
  email: string;
  plan: "free" | "pro";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[160px] justify-between rounded-full">
          <span className="truncate">{email}</span>
          <Sparkles className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-medium normal-case tracking-normal text-foreground">{email}</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {plan === "pro" ? "Pro Workspace" : "Free Workspace"}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="w-full">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard#history" className="w-full">
            <Star className="h-4 w-4" />
            Prompt history
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard#billing" className="w-full">
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/api/auth/logout" method="post">
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

