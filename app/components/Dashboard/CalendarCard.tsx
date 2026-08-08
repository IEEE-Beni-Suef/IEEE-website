import React from "react";

export interface CalendarEventItem {
  title: string;
  date: string;
  dotColor: string;
}

export interface CalendarCardProps {
  monthLabel?: string;
  eventCount?: number;
  events?: CalendarEventItem[];
  onClick?: () => void;
  className?: string;
}

export const CalendarCard: React.FC<CalendarCardProps> = ({
  monthLabel = "July 2026",
  eventCount = 5,
  events = [],
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#FEFEFF] border border-[#00064012] rounded-3xl p-5 shadow-[0px_1px_4px_0px_#0006400F] cursor-pointer hover:shadow-md transition-all flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-[#000640]">Calendar</h3>
          <span className="px-2.5 py-1 bg-[#EFE7F6] text-[#5A10A5] text-[10px] font-extrabold rounded-full">
            {eventCount} events
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-[#000640] mb-2">
          <span>{monthLabel}</span>
          <div className="flex items-center gap-1 text-gray-400">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>

        {/* Days header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#6C757D] uppercase mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
          <span className="p-1 text-gray-300"></span>
          <span className="p-1 text-gray-300"></span>
          <span className="p-1">1</span>
          <span className="p-1">2</span>
          <span className="p-1 text-[#5A10A5] bg-[#EFE7F6] rounded-md font-bold">3</span>
          <span className="p-1">4</span>
          <span className="p-1">5</span>
          <span className="p-1">6</span>
          <span className="p-1">7</span>
          <span className="p-1">8</span>
          <span className="p-1">9</span>
          <span className="p-1 text-[#5A10A5] bg-[#EFE7F6] rounded-md font-bold">10</span>
          <span className="p-1">11</span>
          <span className="p-1">12</span>
          <span className="p-1">13</span>
          <span className="p-1">14</span>
          <span className="p-1">15</span>
          <span className="p-1">16</span>
          <span className="p-1">17</span>
          <span className="p-1.5 bg-[#5A10A5] text-white rounded-md font-bold shadow-xs">
            18
          </span>
          <span className="p-1">19</span>
          <span className="p-1">20</span>
          <span className="p-1">21</span>
          <span className="p-1 text-[#5A10A5] bg-[#EFE7F6] rounded-md font-bold">22</span>
          <span className="p-1">23</span>
          <span className="p-1">24</span>
          <span className="p-1">25</span>
          <span className="p-1">26</span>
          <span className="p-1 text-[#5A10A5] bg-[#EFE7F6] rounded-md font-bold">27</span>
          <span className="p-1">28</span>
          <span className="p-1">29</span>
          <span className="p-1">30</span>
          <span className="p-1">31</span>
        </div>

        {/* Upcoming List */}
        {events.length > 0 && (
          <div className="mt-4 pt-3 space-y-2">
            <span className="text-[10px] font-semibold text-[#6C757D] uppercase tracking-wider block">
              UPCOMING
            </span>

            {events.map((event) => (
              <div
                key={event.title}
                className="flex items-center justify-between text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${event.dotColor}`} />
                  <span className="text-[#000640]">
                    {event.title}
                  </span>
                </div>
                <span className="text-[#6C757D] text-[11px]">{event.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
