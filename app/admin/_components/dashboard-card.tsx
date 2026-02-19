import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export default function DashboardCard({
  title,
  description,
  children,
  className,
  action,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      {(title || description || action) && (
        <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <div className="flex flex-col space-y-1.5">
            {title && (
              <h3 className="font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={cn("p-6", (title || description || action) && "pt-0")}>
        {children}
      </div>
    </div>
  );
}
