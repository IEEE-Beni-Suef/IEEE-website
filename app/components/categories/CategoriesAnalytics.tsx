import React from "react";
import { PieChart } from "lucide-react";

export function CategoriesAnalytics() {
  const data = [
    { label: "Workshop", count: 12, color: "#5A10A5" },
    { label: "Competition", count: 8, color: "#4460EF" },
    { label: "Seminar", count: 5, color: "#D97706" },
    { label: "Bootcamp", count: 10, color: "#059669" },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#5A10A5]" />
          <div>
            <h3 className="font-extrabold text-sm text-gray-900">
              Category Distribution
            </h3>
            <p className="text-[11px] font-medium text-gray-400">
              Events per category
            </p>
          </div>
        </div>

        <button
          type="button"
          className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#5A10A5] font-bold text-xs hover:bg-purple-100 transition-colors cursor-pointer border-0"
        >
          Expand
        </button>
      </div>

      {/* SVG Donut Chart Visualization */}
      <div className="flex items-center justify-center py-2">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-purple-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Workshop segment (35%) */}
            <path
              stroke="#5A10A5"
              strokeWidth="4.5"
              strokeDasharray="35, 100"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Bootcamp segment (28%) */}
            <path
              stroke="#059669"
              strokeWidth="4.5"
              strokeDasharray="28, 100"
              strokeDashoffset="-37"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Competition segment (22%) */}
            <path
              stroke="#4460EF"
              strokeWidth="4.5"
              strokeDasharray="22, 100"
              strokeDashoffset="-67"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Seminar segment (15%) */}
            <path
              stroke="#D97706"
              strokeWidth="4.5"
              strokeDasharray="13, 100"
              strokeDashoffset="-90"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-2 pt-2 border-t border-purple-50">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-semibold text-gray-700">{item.label}</span>
            </div>
            <span className="font-extrabold text-gray-900">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesAnalytics;
