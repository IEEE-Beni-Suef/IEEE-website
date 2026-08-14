import React, { useMemo } from "react";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import type { ApiEvent } from "~/types/api.types";
import { useApiEvents } from "~/hooks/useEventsAndCategories";

interface UpcomingEventItem {
  id: string | number;
  title: string;
  tag: string;
  time: string;
  location: string;
  rawEvent?: ApiEvent;
}

interface UpcomingEventsCardProps {
  events?: ApiEvent[];
  onSelectEvent?: (event: ApiEvent) => void;
  onViewAll?: () => void;
}

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  events: propEvents,
  onSelectEvent,
  onViewAll,
}) => {
  const { data: apiEvents = [] } = useApiEvents();
  const allEvents = propEvents && propEvents.length > 0 ? propEvents : apiEvents;

  const displayEvents: UpcomingEventItem[] = useMemo(() => {
    if (!allEvents || allEvents.length === 0) return [];

    const upcoming = allEvents.filter((e) => e.isCommingSoon || (e.startDate && new Date(e.startDate) >= new Date()));
    const list = upcoming.length > 0 ? upcoming : allEvents;

    return list.slice(0, 4).map((e: any) => {
      const startDate = e.startDate ? new Date(e.startDate) : new Date();
      const dateTag = startDate.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const timeStr = startDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

      return {
        id: e.id,
        title: e.title || e.name,
        tag: e.isCommingSoon ? "SOON" : dateTag,
        time: timeStr,
        location: e.location || e.cast || "IEEE Hall",
        rawEvent: e,
      };
    });
  }, [allEvents]);

  return (
    <div className="rounded-2xl p-5 border border-purple-100/70 bg-white text-gray-900 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-sm tracking-tight text-gray-900">
            Upcoming Events
          </h3>
          <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-purple-100 text-[#5A10A5]">
            {displayEvents.length} soon
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {displayEvents.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-400">
            No upcoming events scheduled.
          </div>
        ) : (
          displayEvents.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.rawEvent && onSelectEvent) onSelectEvent(item.rawEvent);
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
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsCard;
