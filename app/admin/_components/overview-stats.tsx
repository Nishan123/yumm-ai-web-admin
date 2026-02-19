import { Users, Utensils, Activity, Flag } from "lucide-react";
import DashboardCard from "./dashboard-card";

interface OverviewStatsProps {
  data: {
    totalUsers: number;
    totalRecipes: number;
    activeSessions: number;
    openBugReports: number;
  };
}

export default function OverviewStats({ data }: OverviewStatsProps) {
  // Mock changes for now or calculate from historical data if available
  // Since we only get current totals, we can't calculate real changes yet.
  const stats = [
    {
      label: "Total Users",
      value: data.totalUsers.toLocaleString(),
      change: "+0% from last month", // Placeholder
      icon: Users,
    },
    {
      label: "Total Recipes",
      value: data.totalRecipes.toLocaleString(),
      change: "+0% from last month", // Placeholder
      icon: Utensils,
    },
    {
      label: "Active Sessions",
      value: data.activeSessions.toLocaleString(),
      change: "+0% since last hour", // Placeholder
      icon: Activity,
    },
    {
      label: "Bug Reports",
      value: data.openBugReports.toLocaleString(),
      change: "Open Reports",
      icon: Flag,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <DashboardCard key={index}>
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium tracking-tight whitespace-nowrap">
              {stat.label}
            </h3>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <p className="text-xs text-muted-foreground">{stat.change}</p>
        </DashboardCard>
      ))}
    </div>
  );
}
