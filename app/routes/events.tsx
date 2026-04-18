import type { MetaArgs } from "react-router";
import { CalendarDays, Tag, Clock } from "lucide-react";
import { Section } from "~/components/ui/Section";
import { useApiEvents, useApiCategories } from "~/hooks/useEventsAndCategories";
import type { ApiEvent } from "~/types/api.types";

export function meta({}: MetaArgs) {
  return [
    { title: "Events - IEEE BNS" },
    {
      name: "description",
      content: "Discover upcoming IEEE BNS events, workshops, and activities",
    },
  ];
}

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

function EventCard({ event, categoryName }: { event: ApiEvent; categoryName: string }) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Category badge + Status */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
            <Tag className="w-3 h-3" />
            {categoryName}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              event.isCommingSoon
                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
            }`}
          >
            <Clock className="w-3 h-3" />
            {event.isCommingSoon ? "Coming Soon" : "Scheduled"}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {event.name}
        </h3>

        {/* Dates */}
        {!event.isCommingSoon && (event.startDate || event.endDate) && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-4 h-4 shrink-0 text-blue-500" />
            <span>
              {formatDate(event.startDate)}
              {event.endDate && event.startDate !== event.endDate && ` → ${formatDate(event.endDate)}`}
            </span>
          </div>
        )}

        {/* Keywords */}
        {event.keyWords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
            {event.keyWords.map((kw) => (
              <span
                key={kw}
                className="px-2 py-0.5 rounded-full text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Events() {
  const { data: events = [], isLoading, error } = useApiEvents();
  const { data: categories = [] } = useApiCategories();

  const getCatName = (id: string) =>
    categories.find((c) => c.id === id)?.name ?? "Event";

  return (
    <Section id="events" padding="xl" className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            IEEE BNS Events
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Workshops, competitions, and activities organized by your chapter
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-52 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-red-500 dark:text-red-400">
            Failed to load events. Please try again later.
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && events.length === 0 && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <CalendarDays className="w-14 h-14 mx-auto mb-4 opacity-40" />
            <p className="text-xl font-medium">No events yet</p>
            <p className="text-sm mt-2">Check back soon for upcoming activities!</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                categoryName={getCatName(event.categoryId)}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}