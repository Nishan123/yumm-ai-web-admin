"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import OverviewStats from "./_components/overview-stats";
import RecentActivity from "./_components/recent-activity";
import GrowthChart from "./_components/growth-chart";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <p className="text-destructive">
          Failed to load dashboard data: {error}
        </p>
      </div>
    );
  }

  // Provide default/empty data if null to prevent crashes
  const stats = data?.stats || {
    totalUsers: 0,
    totalRecipes: 0,
    activeSessions: 0,
    openBugReports: 0,
  };
  const growth = data?.growth || [];
  const activity = data?.activity || [];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <OverviewStats data={stats} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <GrowthChart data={growth} />
          </div>
          <div className="col-span-3">
            <RecentActivity data={activity} />
          </div>
        </div>
      </div>
    </div>
  );
}
