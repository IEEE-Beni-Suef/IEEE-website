import React from "react";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface UpcomingMeetingsWidgetProps {
  onViewAll: () => void;
}

export const UpcomingMeetingsWidget: React.FC<UpcomingMeetingsWidgetProps> = ({
  onViewAll,
}) => {
  const { isDark } = useTheme();

  const meetings = [
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
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-base">Upcoming Meetings</h3>
          </div>
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-1"
          >
            View All <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* List of meetings */}
        <div className="space-y-2.5">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`p-3 rounded-xl border border-l-4 ${meeting.tagColor} ${
                isDark ? "bg-[#161F33] border-gray-800" : "bg-gray-50 border-gray-100"
              } transition-colors flex items-center justify-between gap-3`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs truncate">{meeting.title}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${meeting.tagBg}`}>
                    {meeting.tag}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {meeting.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {meeting.time}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="block text-xs font-extrabold text-[#5A10A5] dark:text-purple-300">
                  {meeting.date}
                </span>
                <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 rounded-md">
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

export default UpcomingMeetingsWidget;
