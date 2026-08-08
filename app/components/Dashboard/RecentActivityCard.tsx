import React from "react";
import {
  ArrowRight,
  UserCheck,
  Calendar as CalendarIcon,
  FileText,
  Users,
  Sparkles,
} from "lucide-react";

export interface RecentActivityItem {
  id: string | number;
  icon?: React.ReactNode;
  title: string;
  time: string;
  iconBackground?: string;
  iconColor?: string;
  type?: string;
}

export interface RecentActivityCardProps {
  title?: string;
  activities?: RecentActivityItem[];
  onViewAll?: () => void;
  className?: string;
}

const getDefaultIconAndStyle = (type?: string) => {
  switch (type) {
    case "approval":
    case "user":
      return {
        icon: <UserCheck className="w-4 h-4" />,
        bg: "bg-blue-50 dark:bg-blue-950/50",
        color: "text-blue-600",
      };
    case "meeting":
      return {
        icon: <CalendarIcon className="w-4 h-4" />,
        bg: "bg-purple-50 dark:bg-purple-950/50",
        color: "text-purple-600",
      };
    case "article":
      return {
        icon: <FileText className="w-4 h-4" />,
        bg: "bg-emerald-50 dark:bg-emerald-950/50",
        color: "text-emerald-600",
      };
    case "event":
      return {
        icon: <Sparkles className="w-4 h-4" />,
        bg: "bg-indigo-50 dark:bg-indigo-950/50",
        color: "text-indigo-600",
      };
    default:
      return {
        icon: <Users className="w-4 h-4" />,
        bg: "bg-teal-50 dark:bg-teal-950/50",
        color: "text-teal-600",
      };
  }
};

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  title = "Recent Activity",
  activities = [],
  onViewAll,
  className = "",
}) => {
  return (
    <div
      className={`bg-white  border border-[#00064012] shadow-[0px_1px_4px_0px_#0006400F]  rounded-3xl p-5 flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-[#000640]">
            {title}
          </h3>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-[#4460EF] flex items-center gap-1 "
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          {activities.map((activity) => {
            const defaultStyle = getDefaultIconAndStyle(activity.type);
            const icon = activity.icon || defaultStyle.icon;
            const iconBg = activity.iconBackground || defaultStyle.bg;
            const iconColor = activity.iconColor || defaultStyle.color;

            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${iconBg} ${iconColor}`}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#000640] leading-snug">
                    {activity.title}
                  </p>
                  <span className="text-[11px] text-[#6C757D] font-medium">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
