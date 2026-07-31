import React from "react";
import { X, Calendar, Clock, MapPin, Users, Edit3, CheckCircle } from "lucide-react";
import type { DashboardMeeting } from "~/types/dashboard";

interface MeetingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting?: DashboardMeeting | null;
}

export const MeetingDetailsModal: React.FC<MeetingDetailsModalProps> = ({
  isOpen,
  onClose,
  meeting,
}) => {
  if (!isOpen) return null;

  const sampleMeeting: DashboardMeeting = meeting || {
    id: 1,
    title: "Weekly UI/UX Meeting",
    committee: "UI/UX Committee",
    date: "Thursday, July 20, 2026",
    time: "6:00 PM — 7:30 PM",
    location: "Room 304, Engineering Building",
    description: "Review current design systems, component guidelines, and prototype flows.",
    attendanceCount: 32,
    totalCount: 36,
    bannerUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    attendees: [
      { id: 1, name: "Mohammed Sharaf" },
      { id: 2, name: "Karim Nasser" },
      { id: 3, name: "Layla Ibrahim" },
      { id: 4, name: "Nour Hassan" },
      { id: 5, name: "Omar Youssef" },
    ],
    agenda: [
      "Review sprint progress & design updates",
      "Figma component library sync",
      "Usability testing feedback analysis",
      "Assign next phase deliverables",
    ],
  };

  const percentage = Math.round(
    (sampleMeeting.attendanceCount / sampleMeeting.totalCount) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Banner Graphic */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden shrink-0">
          <img
            src={sampleMeeting.bannerUrl}
            alt={sampleMeeting.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="px-3 py-1 bg-[#4F46E5] text-white text-xs font-bold rounded-full uppercase">
                {sampleMeeting.committee}
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1">
                {sampleMeeting.title}
              </h3>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-gray-900 rounded-xl text-xs font-bold shadow-md transition-all">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-5 flex-1 overflow-y-auto pr-1">
          {/* Key Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4F46E5]" />
              <span>{sampleMeeting.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#4F46E5]" />
              <span>{sampleMeeting.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4F46E5]" />
              <span className="truncate">{sampleMeeting.location}</span>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#4F46E5]" /> Attendance Summary
              </span>
              <span className="text-[#4F46E5] font-extrabold">
                {sampleMeeting.attendanceCount} / {sampleMeeting.totalCount} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Agenda */}
          {sampleMeeting.agenda && (
            <div>
              <h4 className="text-sm font-bold text-[#000640] dark:text-white mb-2">
                Meeting Agenda
              </h4>
              <ul className="space-y-2">
                {sampleMeeting.agenda.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-2xl text-xs font-bold shadow-md transition-all"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsModal;
