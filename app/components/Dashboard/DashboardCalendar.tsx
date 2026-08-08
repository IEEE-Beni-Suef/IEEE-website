import React from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface DashboardCalendarProps {
  onOpenModal: () => void;
}

export const DashboardCalendar: React.FC<DashboardCalendarProps> = ({ onOpenModal }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // July 2026 sample days
  const calendarDays = [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true, hasEvent: true, isSelected: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, hasEvent: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true, hasEvent: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
  ];

  return (
    <div
      onClick={onOpenModal}
      className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#000640] dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#4F46E5]" />
          <span>July 2026</span>
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-[#4F46E5] transition-colors ml-1" />
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase">
            {day}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((item, idx) => (
          <div
            key={idx}
            className={`h-8 flex flex-col items-center justify-center rounded-lg text-xs font-semibold relative transition-colors ${
              !item.isCurrentMonth
                ? "text-gray-300 dark:text-gray-700"
                : item.isSelected
                ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-500/30"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span>{item.day}</span>
            {item.hasEvent && !item.isSelected && (
              <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full absolute bottom-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCalendar;
