import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Choose a new password"
      description="Set a fresh password for your PromptForge AI account. Once saved, you can return to the dashboard."
      footer={
        <>
          Need to start over?{" "}
          <Link href="/forgot-password" className="text-primary transition hover:text-primary/80">
            Request a new reset link
          </Link>
        </>
      }
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}

