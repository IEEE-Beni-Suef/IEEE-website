import React, { useMemo } from "react";
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import type { DashboardEvent } from "~/types/dashboard";
import { useAllEvents, useAllMeetings } from "~/hooks/useApi";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  events?: DashboardEvent[];
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, events }) => {
  const { data: apiEvents } = useAllEvents();
  const { data: apiMeetings } = useAllMeetings();

  const sampleEventsFallback: DashboardEvent[] = [
    {
      id: 1,
      title: "UI/UX Committee Meeting",
      date: "2026-07-20",
      time: "06:00 PM - 07:30 PM",
      location: "Room 304, Engineering Building",
      capacity: 36,
      description: "Weekly design review and prototype presentation.",
    },
    {
      id: 2,
      title: "Tech Workshop 2026",
      date: "2026-07-22",
      time: "10:00 AM - 02:00 PM",
      location: "Main Auditorium",
      capacity: 120,
      description: "Hands-on machine learning and artificial intelligence workshop.",
    },
    {
      id: 3,
      title: "Branch Assembly",
      date: "2026-07-27",
      time: "04:00 PM - 06:00 PM",
      location: "Grand Hall",
      capacity: 200,
      description: "All-members general assembly and mid-year progress review.",
    },
  ];

  const sampleEvents: DashboardEvent[] = useMemo(() => {
    if (events && events.length > 0) return events;

    const mappedEvents: DashboardEvent[] = (apiEvents || []).map((ev: any) => ({
      id: ev.id,
      title: ev.name || ev.title || "IEEE Event",
      date: ev.eventDate ? ev.eventDate.split("T")[0] : ev.createdAt ? ev.createdAt.split("T")[0] : "2026-07-20",
      time: "10:00 AM - 02:00 PM",
      location: ev.location || "Main Auditorium",
      capacity: 100,
      description: ev.description || "",
    }));

    const mappedMeetings: DashboardEvent[] = (apiMeetings || []).map((m: any) => ({
      id: m.id + 1000,
      title: m.title || "Committee Meeting",
      date: m.createdAt ? m.createdAt.split("T")[0] : "2026-07-20",
      time: m.recap || "06:00 PM - 07:30 PM",
      location: m.description || "IEEE Hall",
      capacity: 30,
      description: m.description || "",
    }));

    const combined = [...mappedEvents, ...mappedMeetings];
    return combined.length > 0 ? combined : sampleEventsFallback;
  }, [events, apiEvents, apiMeetings]);

  if (!isOpen) return null;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-4xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#4F46E5]" />
            <h3 className="text-xl font-bold text-[#000640] dark:text-white">Calendar & Events</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-1">
          {/* Main Calendar View */}
          <div className="lg:col-span-2 bg-gray-50/60 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-[#000640] dark:text-white">July 2026</h4>
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-gray-400 mb-2">
              {daysOfWeek.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: 31 }).map((_, i) => {
                const dayNum = i + 1;
                const isEventDay = [20, 22, 27].includes(dayNum);
                const isSelected = dayNum === 20;

                return (
                  <div
                    key={i}
                    className={`h-10 flex flex-col items-center justify-center rounded-xl font-bold transition-all ${
                      isSelected
                        ? "bg-[#4F46E5] text-white shadow-md shadow-indigo-500/30"
                        : isEventDay
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span>{dayNum}</span>
                    {isEventDay && !isSelected && (
                      <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legends */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Meeting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">Workshop</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-gray-600 dark:text-gray-400">Assembly</span>
              </div>
            </div>
          </div>

          {/* Event List Side Panel */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#000640] dark:text-white">
              Upcoming Events & Meetings
            </h4>

            {sampleEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xs space-y-1.5"
              >
                <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-[#4F46E5] dark:text-indigo-400 text-[10px] font-extrabold rounded-full uppercase">
                  {ev.date}
                </span>
                <h5 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {ev.title}
                </h5>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{ev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold transition-colors"
          >
            Close Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
