import React from "react";
import { Pencil, Plus, EyeOff, FolderPlus, Activity } from "lucide-react";

export function CategoryRecentActivity() {
  const activities = [
    {
      id: 1,
      title: "Workshop category updated",
      time: "2 hours ago",
      icon: <Pencil className="w-3.5 h-3.5 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      id: 2,
      title: "Bootcamp category added event",
      time: "5 hours ago",
      icon: <Plus className="w-3.5 h-3.5 text-emerald-600" />,
      bg: "bg-emerald-100",
    },
    {
      id: 3,
      title: "Field Trip set to Hidden",
      time: "1 day ago",
      icon: <EyeOff className="w-3.5 h-3.5 text-gray-500" />,
      bg: "bg-gray-100",
    },
    {
      id: 4,
      title: "Networking category created",
      time: "2 days ago",
      icon: <FolderPlus className="w-3.5 h-3.5 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      id: 5,
      title: "Competition description updated",
      time: "4 days ago",
      icon: <Pencil className="w-3.5 h-3.5 text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#5A10A5]" />
        <h3 className="font-extrabold text-sm text-gray-900">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${item.bg} flex items-center justify-center mt-0.5`}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 leading-snug truncate">
                {item.title}
              </p>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryRecentActivity;
