import React from "react";
import { Calendar, ChevronRight } from "lucide-react";

interface EmailUpcomingScheduledCardProps {
  onViewAll?: () => void;
}

export const EmailUpcomingScheduledCard: React.FC<EmailUpcomingScheduledCardProps> = ({
  onViewAll,
}) => {
  const queuedEmails: any[] = [];

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#000640]">Upcoming Scheduled</h3>
          <p className="text-xs text-[#6C757D]">{queuedEmails.length} emails queued</p>
        </div>
        {onViewAll && queuedEmails.length > 0 && (
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
        {queuedEmails.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-400">
            No scheduled emails queued.
          </div>
        ) : (
          queuedEmails.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
};
