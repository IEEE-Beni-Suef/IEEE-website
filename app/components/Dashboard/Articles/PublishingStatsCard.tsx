import React from "react";
import { BarChart3 } from "lucide-react";

export function PublishingStatsCard() {
  const days = [
    { day: "Mon", count: 2, height: "40%" },
    { day: "Tue", count: 4, height: "70%" },
    { day: "Wed", count: 1, height: "30%" },
    { day: "Thu", count: 5, height: "90%" },
    { day: "Fri", count: 3, height: "55%" },
    { day: "Sat", count: 2, height: "35%" },
    { day: "Sun", count: 1, height: "20%" },
  ];

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#5A10A5]" />
          <h3 className="font-extrabold text-sm text-gray-900">
            Publishing Overview
          </h3>
        </div>
        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
          This Week
        </span>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-2">
        <div className="h-28 flex items-end justify-between gap-2 px-1">
          {days.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full bg-purple-50 rounded-t-lg h-24 flex items-end p-1 relative overflow-hidden">
                <div
                  className="w-full bg-gradient-to-t from-[#5A10A5] to-purple-400 rounded-t transition-all duration-500 group-hover:brightness-110"
                  style={{ height: item.height }}
                />
              </div>
              <span className="text-[10px] font-semibold text-gray-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

