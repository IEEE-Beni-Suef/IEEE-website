import React from "react";
import { BarChart3 } from "lucide-react";

interface TasksPerCommitteeCardProps {
  onViewReportClick?: () => void;
}

export function TasksPerCommitteeCard({
  onViewReportClick,
}: TasksPerCommitteeCardProps) {
  const committees = [
    { name: "Web Committee", done: "7/12", percent: 58, color: "#4460EF" },
    { name: "UI/UX Committee", done: "5/8", percent: 63, color: "#5A10A5" },
    { name: "PR Committee", done: "4/9", percent: 44, color: "#D97706" },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-900">
          Tasks Per Committee
        </h3>
        <BarChart3 className="w-4 h-4 text-[#5A10A5]" />
      </div>

      <div className="space-y-3.5">
        {committees.map((item) => (
          <div key={item.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-900">{item.name}</span>
              <span className="text-gray-400 font-semibold">{item.done}</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full"
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
        className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5A10A5] font-bold text-xs transition-colors cursor-pointer border-0 flex items-center justify-center gap-1"
      >
        View Full Report →
      </button>
    </div>
  );
}

export default TasksPerCommitteeCard;
