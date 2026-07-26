import React, { useState } from "react";
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { Meeting } from "~/types";

interface CalendarViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetings: Meeting[];
}

export const CalendarViewModal: React.FC<CalendarViewModalProps> = ({
  isOpen,
  onClose,
  meetings,
}) => {
  const { isDark } = useTheme();
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [currentMonth, setCurrentMonth] = useState<string>("July 2025");

  if (!isOpen) return null;

  // Days in July 2025 (starts on Tuesday = day index 2)
  const daysInJuly = 31;
  const startDayOffset = 2; // Sunday 0, Monday 1, Tuesday 2

  // Mock map of meeting dates for July 2025
  const meetingsByDay: Record<number, Array<{ title: string; time: string; location: string; status: "Upcoming" | "Completed" | "Cancelled" }>> = {
    10: [{ title: "Leadership Workshop", time: "02:00 PM - 04:00 PM", location: "Hall B", status: "Upcoming" }],
    18: [{ title: "Technical Review", time: "11:00 AM - 01:00 PM", location: "Lab 3", status: "Completed" }],
    22: [{ title: "Weekly Committee Meeting", time: "10:00 AM - 11:30 AM", location: "Room A-204, Main Campus", status: "Upcoming" }],
    25: [{ title: "Project Sync", time: "04:00 PM - 05:00 PM", location: "Online", status: "Completed" }],
  };

  // Add actual API meetings if matched
  meetings.forEach((m) => {
    // If meeting object has date day
    const dayMatch = m.id % 28 + 1; // Fallback mapping for demo
    if (!meetingsByDay[dayMatch]) {
      meetingsByDay[dayMatch] = [
        {
          title: m.title,
          time: "10:00 AM - 11:30 AM",
          location: "Room A-204",
          status: (m.type as any) || "Upcoming",
        },
      ];
    }
  });

  const selectedDayMeetings = meetingsByDay[selectedDay] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl transition-colors duration-200 ${
          isDark ? "bg-[#101726] text-white border border-[#232D42]" : "bg-[#F3F4F6] text-[#000640]"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200/10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-[#232C47] text-[#A78BFA]" : "bg-[#F3E8FF] text-[#5A10A5]"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Calendar View</h2>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {currentMonth} · {Object.keys(meetingsByDay).length} meetings scheduled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setCurrentMonth("June 2025")}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  isDark ? "hover:bg-[#1E2738] text-gray-300" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" /> June
              </button>
              <span className="font-bold text-sm">{currentMonth}</span>
              <button
                onClick={() => setCurrentMonth("August 2025")}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  isDark ? "hover:bg-[#1E2738] text-gray-300" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                August <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "text-gray-400 hover:bg-[#1E2738]" : "text-gray-400 hover:bg-gray-200"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center mb-2">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div
              key={d}
              className={`text-[11px] font-bold py-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 text-center gap-y-2 mb-6">
          {/* Empty offset cells */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="h-12" />
          ))}

          {/* Days 1 to 31 */}
          {Array.from({ length: daysInJuly }).map((_, i) => {
            const dayNum = i + 1;
            const hasMeetings = !!meetingsByDay[dayNum];
            const isSelected = selectedDay === dayNum;
            const isToday = dayNum === 15;

            let dotColor = "bg-[#7C3AED]";
            if (hasMeetings) {
              const status = meetingsByDay[dayNum][0]?.status;
              if (status === "Completed") dotColor = "bg-[#3B82F6]";
              if (status === "Cancelled") dotColor = "bg-[#EF4444]";
            }

            return (
              <div key={dayNum} className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all ${
                    isSelected
                      ? "bg-[#5A10A5] text-white shadow-lg shadow-purple-500/30 scale-105 font-bold"
                      : isToday
                      ? isDark
                        ? "border-2 border-[#7C3AED] text-white bg-[#1A1C30]"
                        : "border-2 border-[#A855F7] text-[#5A10A5] bg-[#F5F0FF]"
                      : isDark
                      ? "hover:bg-[#1E2738] text-gray-200"
                      : "hover:bg-white text-gray-800"
                  }`}
                >
                  <span className="text-sm font-semibold">{dayNum}</span>
                  {hasMeetings && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                        isSelected ? "bg-white" : dotColor
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Day Info Section */}
        <div className="pt-4 border-t border-gray-200/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold">
              {currentMonth.split(" ")[0]} {selectedDay}, {currentMonth.split(" ")[1]} —{" "}
              <span className={`font-normal ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {selectedDayMeetings.length === 0
                  ? "No meetings"
                  : `${selectedDayMeetings.length} meeting${selectedDayMeetings.length > 1 ? "s" : ""}`}
              </span>
            </h3>
          </div>

          {selectedDayMeetings.length === 0 ? (
            <div
              className={`flex items-center gap-3 p-4 rounded-2xl ${
                isDark ? "bg-[#182033] text-gray-300" : "bg-white text-gray-600"
              }`}
            >
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm">No meetings scheduled for this day.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDayMeetings.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#182033] border-[#253047] text-white"
                      : "bg-white border-gray-100 text-[#000640]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5A10A5]" />
                    <div>
                      <h4 className="text-sm font-bold">{m.title}</h4>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {m.time} · {m.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      m.status === "Upcoming"
                        ? "bg-[#DCFCE7] text-[#166534]"
                        : m.status === "Completed"
                        ? "bg-[#DBEAFE] text-[#1E40AF]"
                        : "bg-[#FEE2E2] text-[#991B1B]"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Status Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200/10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>Upcoming</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>Cancelled</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-[#A855F7] bg-[#F5F0FF]" />
              <span className={isDark ? "text-gray-300" : "text-gray-600"}>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
