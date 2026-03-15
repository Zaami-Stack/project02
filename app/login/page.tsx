import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Log in to upgrade prompts, revisit your history, and manage your PromptForge AI workspace."
      footer={
        <>
          Need an account?{" "}
          <Link href="/signup" className="text-primary transition hover:text-primary/80">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}

