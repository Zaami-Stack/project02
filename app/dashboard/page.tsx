import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/lib/auth";
import { getPromptHistory, getUsageSummary, getUserProfile } from "@/lib/prompts";

export default async function DashboardPage() {
  const user = await requireUser();

  const [profile, initialHistory, initialUsage] = await Promise.all([
    getUserProfile(user.id),
    getPromptHistory(user.id),
    getUsageSummary(user.id)
  ]);

  return (
    <div className="container py-10">
      <DashboardShell profile={profile} initialHistory={initialHistory} initialUsage={initialUsage} />
    </div>
  );
}

