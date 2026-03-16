import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardPage() {
  return (
    <div className="container py-6 sm:py-10">
      <DashboardShell />
    </div>
  );
}
