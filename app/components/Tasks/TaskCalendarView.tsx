import React from "react";
import type { TaskItem } from "./TaskCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskCalendarViewProps {
  tasks: TaskItem[];
  onTaskClick?: (task: TaskItem) => void;
}

export const TaskCalendarView: React.FC<TaskCalendarViewProps> = ({
  tasks,
  onTaskClick,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // 31 days calendar grid for July 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-2xs space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-[#5A10A5] transition-colors cursor-pointer border-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h3 className="font-extrabold text-lg text-gray-900">July 2026</h3>

        <button
          type="button"
          className="p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-[#5A10A5] transition-colors cursor-pointer border-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 pb-2 border-b border-purple-50">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          // Highlight day 25 and 30 with tasks
          const hasTask25 = day === 25;
          const hasTask30 = day === 30;

          return (
            <div
              key={day}
              className={`min-h-[75px] sm:min-h-[90px] p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                hasTask25 || hasTask30
                  ? "bg-purple-50/40 border-purple-200"
                  : "bg-gray-50/30 border-gray-100 hover:bg-purple-50/20"
              }`}
            >
              <span
                className={`text-xs font-extrabold ${
                  hasTask25 || hasTask30
                    ? "text-[#5A10A5]"
                    : "text-gray-700"
                }`}
              >
                {day}
              </span>

              {hasTask25 && (
                <div className="bg-[#FEF3C7] text-[#D97706] rounded-lg p-1 text-[10px] font-bold truncate border border-amber-200/60">
                  📣 Social Media Campaign
                </div>
              )}

              {hasTask30 && (
                <div className="bg-purple-100 text-[#5A10A5] rounded-lg p-1 text-[10px] font-bold truncate border border-purple-200/60">
                  📌 Redesign IEEE Landing Page
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCalendarView;
