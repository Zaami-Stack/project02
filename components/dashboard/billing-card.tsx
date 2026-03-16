"use client";

import { Crown, KeyRound, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { PlanTier } from "@/lib/types";
import { formatDate } from "@/utils/date";

export function BillingCard({
  plan,
  hasActiveCode,
  codeLabel,
  expiresAt,
  paypalUrl,
  fingerprint,
  onAccessChanged
}: {
  plan: PlanTier;
  hasActiveCode: boolean;
  codeLabel: string | null;
  expiresAt: string | null;
  paypalUrl: string;
  fingerprint: string | null;
  onAccessChanged: () => Promise<void>;
}) {
  const [code, setCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isPro = plan === "pro";

  async function redeemCode() {
    if (!fingerprint) {
      toast.error("Secure fingerprint is still loading. Try again in a second.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/access/redeem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            code,
            fingerprint
          })
        });

        const payload = (await response.json()) as { success?: boolean; error?: string };

        if (!response.ok || !payload.success) {
          throw new Error(payload.error ?? "Code redemption failed.");
        }

        toast.success("Pro access unlocked on this device.");
        setCode("");
        setDialogOpen(false);
        await onAccessChanged();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to redeem code.");
      }
    });
  }

  async function revokeCode() {
    startTransition(async () => {
      try {
        const response = await fetch("/api/access/revoke", {
          method: "POST"
        });

        const payload = (await response.json()) as { success?: boolean; error?: string };

        if (!response.ok || !payload.success) {
          throw new Error(payload.error ?? "Unable to revoke code access.");
        }

        toast.success("Pro access removed from this device.");
        await onAccessChanged();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to revoke access.");
      }
    });
  }

  return (
    <Card id="billing">
      <CardHeader className="space-y-4 border-b border-border/70 pb-5">
        <div className="flex items-center justify-between">
          <Badge variant={isPro ? "accent" : "secondary"}>{isPro ? "Pro unlocked" : "Free mode"}</Badge>
          {isPro ? <Crown className="h-5 w-5 text-accent" /> : <ShieldCheck className="h-5 w-5 text-primary" />}
        </div>
        <CardTitle>Pro Access</CardTitle>
        <CardDescription>
          {isPro
            ? "This device is unlocked with your Pro access code."
            : "Buy Pro on PayPal, then enter the private code you receive from the owner."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-border/80 bg-background p-5">
          <p className="text-sm font-medium">{isPro ? "Current mode: Pro" : "Current mode: Free"}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {isPro
              ? "Unlimited prompt upgrades are active on this device."
              : "Free mode includes 10 server-enforced prompt upgrades per day."}
          </p>
          {hasActiveCode ? (
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              {codeLabel ? <p>Code label: {codeLabel}</p> : null}
              {expiresAt ? <p>Session expires: {formatDate(expiresAt)}</p> : null}
            </div>
          ) : null}
        </div>

        <a
          href={paypalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary/75"
        >
          <Wallet className="h-4 w-4" />
          Buy Pro code on PayPal
        </a>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg" variant={isPro ? "outline" : "default"}>
              <KeyRound className="h-4 w-4" />
              {isPro ? "Redeem another code" : "I already have a Pro code"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Redeem Pro access code</DialogTitle>
              <DialogDescription>
                Paste the private code you received after payment. Pro access will unlock on this device instantly.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Enter your access code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              autoFocus
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={redeemCode} disabled={isPending || code.trim().length < 4}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Unlock Pro
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {isPro ? (
          <Button variant="ghost" className="w-full" onClick={revokeCode} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Remove Pro from this device
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
