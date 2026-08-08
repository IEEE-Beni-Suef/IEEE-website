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
      title: "Ahmed M. published 'Pulse Fingerprinting'",
      time: "2h ago",
      type: "article",
    },
    {
      id: 2,
      title: "Sara K. revised 'DC Innovations' for WebDev",
      time: "4h ago",
      type: "approval",
    },
    {
      id: 3,
      title: "Omar F. scheduled 'Nanopackages' article",
      time: "1d ago",
      type: "event",
    },
    {
      id: 4,
      title: "Laila H. drafted 'Women in Engineering'",
      time: "2d ago",
      type: "meeting",
    },
    {
      id: 5,
      title: "Karim N. created FPGA draft",
      time: "3d ago",
      type: "user",
    },
  ];

  const items = activities && activities.length > 0 ? activities : defaultActivities;

  const getIcon = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4 text-purple-600" />;
      case "approval":
        return <UserCheck className="w-4 h-4 text-amber-600" />;
      case "event":
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case "meeting":
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case "user":
        return <UserPlus className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBg = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "article":
        return "bg-purple-100";
      case "approval":
        return "bg-amber-100";
      case "event":
        return "bg-emerald-100";
      case "meeting":
        return "bg-blue-100";
      case "user":
        return "bg-indigo-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#5A10A5]" />
          Recent Activity
        </h3>
        <span className="text-xs text-gray-400 font-medium">Real-time</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-purple-50/50 transition-colors"
          >
            <div className={`p-2 rounded-lg shrink-0 ${getBg(item.type)} mt-0.5`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 leading-snug truncate">
                {item.title}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
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

