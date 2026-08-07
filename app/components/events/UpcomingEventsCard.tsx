import React from "react";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import type { ApiEvent } from "~/types/api.types";

interface UpcomingEventItem {
  id: string;
  title: string;
  tag: string; // e.g. "TOMORROW", "FRIDAY", "MONDAY"
  time: string;
  location: string;
  dateStr?: string;
  category?: string;
}

interface UpcomingEventsCardProps {
  events?: ApiEvent[];
  onSelectEvent?: (event: ApiEvent) => void;
  onViewAll?: () => void;
}

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  events = [],
  onSelectEvent,
  onViewAll,
}) => {
  // Mock list matching Figma screenshot
  const displayEvents: UpcomingEventItem[] = [
    {
      id: "1",
      title: "AI Workshop",
      tag: "TOMORROW",
      time: "6 PM",
      location: "Faculty of Computers",
    },
    {
      id: "2",
      title: "Orientation Day",
      tag: "FRIDAY",
      time: "10 AM",
      location: "Main Hall",
    },
    {
      id: "3",
      title: "Flutter Bootcamp",
      tag: "MONDAY",
      time: "3 PM",
      location: "Lab 201",
    },
  ];

  return (
    <div className="rounded-2xl p-5 border border-purple-100/70 bg-white text-gray-900 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-sm tracking-tight text-gray-900">
            Upcoming Events
          </h3>
          <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-purple-100 text-[#5A10A5]">
            3 soon
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {displayEvents.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              const matched = events.find((e) => e.id === item.id);
              if (matched && onSelectEvent) onSelectEvent(matched);
            }}
            className="p-3.5 rounded-xl border border-purple-50 bg-purple-50/20 hover:bg-purple-50/50 hover:border-purple-200 transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 group"
          >
            <div className="space-y-1 min-w-0">
              <span className="inline-block text-[10px] font-extrabold tracking-wider text-purple-700 uppercase">
                {item.tag}
              </span>
              <h4 className="font-bold text-xs text-gray-900 truncate group-hover:text-[#5A10A5] transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {item.time}
                </span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  {item.location}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="p-1 rounded-lg text-gray-400 group-hover:text-[#5A10A5] transition-colors shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
