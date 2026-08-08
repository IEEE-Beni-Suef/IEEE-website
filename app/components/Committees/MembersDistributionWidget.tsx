import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface MembersDistributionWidgetProps {
  onViewFullReport: () => void;
}

export const MembersDistributionWidget: React.FC<MembersDistributionWidgetProps> = ({
  onViewFullReport,
}) => {
  const { isDark } = useTheme();

  const data = [
    { name: "Web", count: 42, color: "#2563EB" },
    { name: "UI/UX", count: 38, color: "#7F56D9" },
    { name: "Robotics", count: 45, color: "#DC2626" },
    { name: "HR", count: 31, color: "#16A34A" },
    { name: "PR", count: 29, color: "#EA580C" },
    { name: "CS", count: 36, color: "#0891B2" },
  ];

  return (
    <div
      className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-[#EEF0FF] text-[#000640]"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">Members Distribution</h3>
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>

        {/* Donut Chart SVG Container */}
        <div className="flex justify-center my-4 relative">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#2563EB"
              strokeWidth="5"
              strokeDasharray="21 79"
              strokeDashoffset="0"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#7F56D9"
              strokeWidth="5"
              strokeDasharray="18 82"
              strokeDashoffset="-21"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#DC2626"
              strokeWidth="5"
              strokeDasharray="21 79"
              strokeDashoffset="-39"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#16A34A"
              strokeWidth="5"
              strokeDasharray="15 85"
              strokeDashoffset="-60"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#EA580C"
              strokeWidth="5"
              strokeDasharray="13 87"
              strokeDashoffset="-75"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="transparent"
              stroke="#0891B2"
              strokeWidth="5"
              strokeDasharray="17 83"
              strokeDashoffset="-88"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-gray-400">Total</span>
            <span className="text-sm font-extrabold">221</span>
          </div>
        </div>

        {/* Legend grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-gray-50 dark:bg-[#161F33]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
              <span className="font-bold">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#232D42]">
        <button
          onClick={onViewFullReport}
          className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? "bg-[#182033] border-[#232D42] text-purple-300 hover:bg-[#1E2738]"
              : "bg-white border-[#5A10A5] text-[#5A10A5] hover:bg-purple-50"
          }`}
        >
          View Full Report
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default MembersDistributionWidget;
