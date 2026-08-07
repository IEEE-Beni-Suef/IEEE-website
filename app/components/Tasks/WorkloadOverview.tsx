import React from "react";
import { TrendingUp } from "lucide-react";

interface WorkloadOverviewProps {
  onViewReportClick?: () => void;
}

export function WorkloadOverview({ onViewReportClick }: WorkloadOverviewProps) {
  const committees = [
    { name: "Web Committee", tasks: "12 Tasks", percent: 75, color: "#4460EF" },
    { name: "UI/UX Committee", tasks: "8 Tasks", percent: 55, color: "#5A10A5" },
    { name: "PR Committee", tasks: "9 Tasks", percent: 65, color: "#D97706" },
    { name: "HR Committee", tasks: "5 Tasks", percent: 35, color: "#EC4899" },
    { name: "Robotics Committee", tasks: "6 Tasks", percent: 45, color: "#059669" },
    { name: "CS Committee", tasks: "7 Tasks", percent: 50, color: "#0284C7" },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-900">
          Workload Overview
        </h3>
        <TrendingUp className="w-4 h-4 text-[#4460EF]" />
      </div>

      <div className="space-y-3.5">
        {committees.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-900">{item.name}</span>
              <span style={{ color: item.color }}>{item.tasks}</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onViewReportClick}
        className="w-full py-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100/80 text-[#4460EF] font-bold text-xs transition-colors cursor-pointer border border-purple-100/60 flex items-center justify-center gap-1"
      >
        View Full Report →
      </button>
    </div>
  );
}

export default WorkloadOverview;
