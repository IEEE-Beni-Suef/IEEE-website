import React from "react";
import { FileText, UserCheck, Sparkles, Calendar, UserPlus, Bell } from "lucide-react";
import type { RecentActivityItem } from "~/types/dashboard";

interface RecentActivityProps {
  activities?: RecentActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const defaultActivities: RecentActivityItem[] = [
    {
      id: 1,
      title: "Sara Ahmed published new article in Technical",
      time: "10 mins ago",
      type: "article",
    },
    {
      id: 2,
      title: "Karim Nasser requested membership approval",
      time: "45 mins ago",
      type: "approval",
    },
    {
      id: 3,
      title: "New Event: AI Workshop 2026 created",
      time: "2 hours ago",
      type: "event",
    },
    {
      id: 4,
      title: "Meeting scheduled with UI/UX Committee",
      time: "5 hours ago",
      type: "meeting",
    },
    {
      id: 5,
      title: "Nour Hassan approved membership request",
      time: "1 day ago",
      type: "user",
    },
  ];

  const items = activities && activities.length > 0 ? activities : defaultActivities;

  const getIcon = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case "approval":
        return <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "event":
        return <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "meeting":
        return <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "user":
        return <UserPlus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getBg = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "article":
        return "bg-purple-100 dark:bg-purple-950/40";
      case "approval":
        return "bg-amber-100 dark:bg-amber-950/40";
      case "event":
        return "bg-emerald-100 dark:bg-emerald-950/40";
      case "meeting":
        return "bg-blue-100 dark:bg-blue-950/40";
      case "user":
        return "bg-indigo-100 dark:bg-indigo-950/40";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  return (
    <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#000640] dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#4F46E5]" />
          Recent Activity
        </h3>
        <span className="text-xs text-gray-500 font-medium">Real-time</span>
      </div>

      <div className="space-y-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className={`p-2 rounded-lg shrink-0 ${getBg(item.type)} mt-0.5`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-snug truncate">
                {item.title}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
