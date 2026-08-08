import React from "react";
import { Calendar, ChevronRight } from "lucide-react";

interface EmailUpcomingScheduledCardProps {
  onViewAll?: () => void;
}

export const EmailUpcomingScheduledCard: React.FC<EmailUpcomingScheduledCardProps> = ({
  onViewAll,
}) => {
  const queuedEmails = [
    {
      id: 1,
      title: "Orientation Meeting",
      time: "Tomorrow · 09:00 AM",
    },
    {
      id: 2,
      title: "Workshop Reminder",
      time: "Friday · 08:30 AM",
    },
    {
      id: 3,
      title: "Recruitment Announcement",
      time: "Monday · 11:00 AM",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#000640]">Upcoming Scheduled</h3>
          <p className="text-xs text-[#6C757D]">3 emails queued</p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="p-1 text-[#4460EF] hover:bg-indigo-50 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {queuedEmails.map((item) => (
          <div
            key={item.id}
            onClick={onViewAll}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4460EF] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#000640] truncate">{item.title}</p>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
