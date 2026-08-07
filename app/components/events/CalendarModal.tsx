import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState(10);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6); // July (0-indexed 6)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[currentMonthIndex];
  const year = 2025;

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // 1-indexed days mock events
  const mockEvents: Record<number, { title: string; time: string; location: string; status: "Completed" | "Upcoming" | "Cancelled" }> = {
    10: { title: "AI Workshop Event", time: "11:00 AM – 12:00 PM", location: "Conference Room 1", status: "Completed" },
    15: { title: "Orientation Day", time: "10:00 AM – 01:00 PM", location: "Main Hall", status: "Upcoming" },
    18: { title: "Flutter Bootcamp", time: "02:00 PM – 05:00 PM", location: "Lab 201", status: "Upcoming" },
    22: { title: "PCB Design Seminar", time: "01:00 PM – 03:00 PM", location: "Eng Meeting Room", status: "Completed" },
    25: { title: "Leadership Summit", time: "09:00 AM – 04:00 PM", location: "Council Chamber", status: "Cancelled" },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#5A10A5] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">Calendar View</h2>
              <p className="text-xs text-gray-400 font-medium">
                {currentMonthName} {year} • 5 meetings scheduled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : 11))}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                ‹ {months[currentMonthIndex > 0 ? currentMonthIndex - 1 : 11]}
              </button>
              <span className="font-bold px-2 py-1 bg-purple-50 rounded-lg text-[#5A10A5]">
                {currentMonthName} {year}
              </span>
              <button
                type="button"
                onClick={() => setCurrentMonthIndex((prev) => (prev < 11 ? prev + 1 : 0))}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                {months[currentMonthIndex < 11 ? currentMonthIndex + 1 : 0]} ›
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center my-4">
          {daysOfWeek.map((d) => (
            <span key={d} className="text-[11px] font-bold text-gray-400 tracking-wider">
              {d}
            </span>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-6">
          <div /><div />

          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const isSelected = selectedDay === day;
            const eventData = mockEvents[day];
            const isToday = day === 15;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                  isSelected
                    ? "bg-[#5A10A5] text-white font-bold shadow-md shadow-purple-500/30 scale-105"
                    : isToday
                    ? "bg-purple-100 text-[#5A10A5] font-bold"
                    : "hover:bg-purple-50 text-gray-700"
                }`}
              >
                <span>{day}</span>
                {eventData && !isSelected && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                      eventData.status === "Completed"
                        ? "bg-blue-500"
                        : eventData.status === "Upcoming"
                        ? "bg-purple-500"
                        : "bg-rose-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Event Detail for Selected Day */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-900 mb-2">
            {currentMonthName} {selectedDay}, {year}
          </p>

          {mockEvents[selectedDay] ? (
            <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">
                    {mockEvents[selectedDay].title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {mockEvents[selectedDay].time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {mockEvents[selectedDay].location}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                  mockEvents[selectedDay].status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : mockEvents[selectedDay].status === "Upcoming"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {mockEvents[selectedDay].status}
              </span>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic p-3">No events scheduled on this day.</p>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Upcoming
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Cancelled
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-200" /> Today
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
