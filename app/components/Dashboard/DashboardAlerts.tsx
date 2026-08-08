import React from "react";
import { AlertCircle, Clock, Sparkles, ShieldAlert } from "lucide-react";

export interface AlertCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  background: string;
  iconColor: string;
  borderColor?: string;
  onClick?: () => void;
}

export const DashboardAlertCard: React.FC<AlertCardProps> = ({
  icon,
  title,
  subtitle,
  background,
  iconColor,
  borderColor = "border-transparent",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl ${background} border ${borderColor} flex items-center gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer`}
    >
      <div className={`p-2.5 rounded-lg bg-white/70 dark:bg-black/20 ${iconColor} shrink-0`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

interface DashboardAlertsProps {
  onPendingClick?: () => void;
  onEventsClick?: () => void;
  onMeetingsClick?: () => void;
}

export const DashboardAlerts: React.FC<DashboardAlertsProps> = ({
  onPendingClick,
  onEventsClick,
  onMeetingsClick,
}) => {
  const alerts: AlertCardProps[] = [
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "4 Pending Approvals",
      subtitle: "Review new membership requests",
      background: "bg-amber-50 dark:bg-amber-950/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      borderColor: "border-amber-200 dark:border-amber-800/40",
      onClick: onPendingClick,
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Committee Reports Due",
      subtitle: "Submit monthly activity log",
      background: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800/40",
      onClick: onMeetingsClick,
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI Technical Workshop",
      subtitle: "Scheduled for Jul 15, 2026",
      background: "bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800/40",
      onClick: onEventsClick,
    },
    {
      icon: <ShieldAlert className="w-5 h-5" />,
      title: "System Maintenance",
      subtitle: "Scheduled for Sunday 2:00 AM",
      background: "bg-rose-50 dark:bg-rose-950/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      borderColor: "border-rose-200 dark:border-rose-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {alerts.map((alert, index) => (
        <DashboardAlertCard key={index} {...alert} />
      ))}
    </div>
  );
};

export default DashboardAlerts;
