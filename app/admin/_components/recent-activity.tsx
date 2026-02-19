import { ChefHat, UserPlus, FileWarning } from "lucide-react";
import DashboardCard from "./dashboard-card";

const getRelativeTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffParams = (date.getTime() - Date.now()) / 1000;
  const diffSeconds = Math.round(diffParams);
  const diffMinutes = Math.round(diffParams / 60);
  const diffHours = Math.round(diffParams / 3600);
  const diffDays = Math.round(diffParams / 86400);

  if (Math.abs(diffSeconds) < 60) return rtf.format(diffSeconds, "seconds");
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minutes");
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, "hours");
  return rtf.format(diffDays, "days");
};

interface RecentActivityProps {
  data: {
    user: string;
    action: string;
    type: "recipe" | "user" | "bug";
    date: string; // ISO string from API
    details?: string;
  }[];
}

export default function RecentActivity({ data }: RecentActivityProps) {
  return (
    <DashboardCard
      title="Recent Activity"
      description="Latest actions across the platform"
    >
      <div className="space-y-8">
        {(data || []).map((activity, index) => (
          <div key={index} className="flex items-center">
            <div className="bg-muted p-2 rounded-full mr-4">
              {activity.type === "recipe" && <ChefHat className="h-4 w-4" />}
              {activity.type === "user" && <UserPlus className="h-4 w-4" />}
              {activity.type === "bug" && <FileWarning className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user}
                <span className="text-muted-foreground ml-2 font-normal">
                  {activity.action}
                </span>
              </p>
              {activity.details && (
                <p className="text-sm text-muted-foreground">
                  {activity.details}
                </p>
              )}
            </div>
            <div className="ml-auto font-medium text-xs text-muted-foreground">
              {getRelativeTime(new Date(activity.date))}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
