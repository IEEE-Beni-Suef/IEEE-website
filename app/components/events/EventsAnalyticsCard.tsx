import React, { useMemo } from "react";
import { useApiEvents } from "~/hooks/useEventsAndCategories";

interface MetricItem {
  label: string;
  value: number;
  color: string;
}

interface EventsAnalyticsCardProps {
  metrics?: MetricItem[];
}

export const EventsAnalyticsCard: React.FC<EventsAnalyticsCardProps> = ({
  metrics,
}) => {
  const { data: events = [] } = useApiEvents();

  const dynamicMetrics: MetricItem[] = useMemo(() => {
    if (!events || events.length === 0) {
      return [
        { label: "Attendance", value: 100, color: "bg-[#5A10A5]" },
        { label: "Registration", value: 100, color: "bg-[#4f46e5]" },
        { label: "Completion", value: 100, color: "bg-[#16a34a]" },
      ];
    }

    const total = events.length;
    const completed = events.filter((e: any) => e.endDate && new Date(e.endDate) < new Date()).length;
    const comingSoon = events.filter((e: any) => e.isCommingSoon).length;

    const completionRate = Math.round((completed / total) * 100) || 100;
    const registrationRate = Math.round(((total - comingSoon) / total) * 100) || 100;
    const attendanceRate = Math.min(100, completionRate + 5);

    return [
      { label: "Attendance", value: attendanceRate, color: "bg-[#5A10A5]" },
      { label: "Registration", value: registrationRate, color: "bg-[#4f46e5]" },
      { label: "Completion", value: completionRate, color: "bg-[#16a34a]" },
    ];
  }, [events]);

  const items = metrics || dynamicMetrics;

  return (
    <div className="rounded-2xl p-5 border border-purple-100/70 bg-white text-gray-900 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-extrabold text-sm tracking-tight text-gray-900">
          Analytics
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-700">{item.label}</span>
              <span className="text-gray-900 font-extrabold">{item.value}%</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsAnalyticsCard;
