import React from "react";
import { CheckSquare, ArrowRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface TopCommitteesTasksWidgetProps {
  onViewFullReport: () => void;
}

export const TopCommitteesTasksWidget: React.FC<TopCommitteesTasksWidgetProps> = ({
  onViewFullReport,
}) => {
  const { isDark } = useTheme();

  const tasksData = [
    { name: "Web Committee", tasks: "24 Tasks", color: "#3B82F6", width: "100%" },
    { name: "UI/UX Committee", tasks: "18 Tasks", color: "#7C3AED", width: "75%" },
    { name: "PR Committee", tasks: "15 Tasks", color: "#EA580C", width: "62%" },
    { name: "CS Committee", tasks: "14 Tasks", color: "#0D9488", width: "58%" },
    { name: "HR Committee", tasks: "12 Tasks", color: "#16A34A", width: "50%" },
    { name: "Robotics", tasks: "9 Tasks", color: "#DC2626", width: "37%" },
  ];

  return (
    <div
      className={`rounded-3xl border p-5 transition-all flex flex-col justify-between ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-[#EEF0FF] text-[#0D1B3E] shadow-xs"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base">Top Committees by Tasks</h3>
          <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Progress List */}
        <div className="space-y-3.5 my-2">
          {tasksData.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0D1B3E] dark:text-gray-200">
                  {item.name}
                </span>
                <span className="font-extrabold text-gray-500 dark:text-gray-400 text-[11px]">
                  {item.tasks}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#F1F5F9] dark:bg-[#161F33] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ backgroundColor: item.color, width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#232D42]">
        <button
          onClick={onViewFullReport}
          className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? "bg-[#182033] border-[#232D42] text-blue-400 hover:bg-[#1E2738]"
              : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          View Full Report
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TopCommitteesTasksWidget;
