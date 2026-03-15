import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your workspace"
      description="Start on the free plan, generate up to 10 premium prompts per day, and upgrade when you need unlimited throughput."
      footer={
        <>
          Already signed up?{" "}
          <Link href="/login" className="text-primary transition hover:text-primary/80">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}

