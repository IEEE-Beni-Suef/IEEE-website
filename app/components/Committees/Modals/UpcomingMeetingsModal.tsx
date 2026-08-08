import React, { useState } from "react";
import { X, Search, Clock, MapPin } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface UpcomingMeetingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpcomingMeetingsModal: React.FC<UpcomingMeetingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const allMeetings = [
    {
      id: 1,
      title: "Sprint Planning",
      tag: "Web",
      tagColor: "border-l-[#2563EB]",
      tagBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
      location: "Lab 3",
      date: "Jul 28",
      time: "10:00 AM",
    },
    {
      id: 2,
      title: "Design Review",
      tag: "UI/UX",
      tagColor: "border-l-[#7F56D9]",
      tagBg: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
      location: "Design Studio",
      date: "Jul 29",
      time: "2:00 PM",
    },
    {
      id: 3,
      title: "Outreach Strategy",
      tag: "PR",
      tagColor: "border-l-[#EA580C]",
      tagBg: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
      location: "Media Room",
      date: "Jul 30",
      time: "11:30 AM",
    },
    {
      id: 4,
      title: "Robot Assembly",
      tag: "Robotics",
      tagColor: "border-l-[#DC2626]",
      tagBg: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
      location: "Robotics Lab",
      date: "Aug 1",
      time: "9:00 AM",
    },
    {
      id: 5,
      title: "Recruitment Review",
      tag: "HR",
      tagColor: "border-l-[#16A34A]",
      tagBg: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
      location: "Admin Office",
      date: "Aug 3",
      time: "3:00 PM",
    },
    {
      id: 6,
      title: "Code Bootcamp Prep",
      tag: "CS",
      tagColor: "border-l-[#0891B2]",
      tagBg: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
      location: "Computer Lab 7",
      date: "Aug 5",
      time: "1:00 PM",
    },
  ];

  const filtered = allMeetings.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-extrabold">All Upcoming Meetings</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meetings..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
              isDark
                ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-500"
                : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
            }`}
          />
        </div>

        {/* List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filtered.map((meeting) => (
            <div
              key={meeting.id}
              className={`p-3.5 rounded-2xl border border-l-4 ${meeting.tagColor} ${
                isDark ? "bg-[#161F33] border-gray-800" : "bg-gray-50/70 border-gray-100"
              } transition-colors flex items-center justify-between gap-3`}
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-xs truncate">{meeting.title}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${meeting.tagBg}`}>
                    {meeting.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {meeting.location}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0 flex items-center gap-3">
                <div>
                  <span className="block text-xs font-extrabold text-[#5A10A5] dark:text-purple-300">
                    {meeting.date}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {meeting.time}
                  </span>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 rounded-lg">
                  Upcoming
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetingsModal;
