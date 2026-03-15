import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      description="We will send a secure password reset link to the email address associated with your PromptForge AI account."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="text-primary transition hover:text-primary/80">
            Back to login
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}

