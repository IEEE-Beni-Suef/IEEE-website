import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EventsCalendarCardProps {
  onOpenFullCalendar?: () => void;
  onSelectDate?: (date: Date) => void;
}

export const EventsCalendarCard: React.FC<EventsCalendarCardProps> = ({
  onOpenFullCalendar,
  onSelectDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026 as shown in Figma screenshot

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Days in August 2026
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Days highlighted in deep purple in Figma design: 1, 2, 10, 15 (and 4)
  const activeDays = [1, 2, 10, 15];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="rounded-2xl p-5 border border-purple-100/70 bg-white text-gray-900 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm tracking-tight text-gray-900">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-[11px] font-semibold text-gray-400">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
        {/* Offset for start day */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-7" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isActive = activeDays.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                if (onSelectDate) onSelectDate(new Date(year, month, day));
              }}
              className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center font-bold transition-all text-xs ${
                isActive
                  ? "bg-[#5A10A5] text-white shadow-xs"
                  : "text-gray-600 hover:bg-purple-50 hover:text-[#5A10A5]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventsCalendarCard;
