import React from "react";
import { Calendar } from "lucide-react";

interface UpcomingDeadlinesProps {
  onViewAllClick?: () => void;
}

export function UpcomingDeadlines({ onViewAllClick }: UpcomingDeadlinesProps) {
  const deadlines = [
    {
      id: 1,
      title: "Social Media Campaign",
      committee: "PR",
      date: "Jul 25",
      timeLeft: "2d left",
      badgeBg: "#FEE2E2",
      badgeColor: "#DC2626",
    },
    {
      id: 2,
      title: "Website Redesign",
      committee: "UI/UX",
      date: "Jul 30",
      timeLeft: "7d left",
      badgeBg: "#E8ECFD",
      badgeColor: "#4460EF",
    },
    {
      id: 3,
      title: "Robotics Workshop Prep",
      committee: "Robotics",
      date: "Aug 3",
      timeLeft: "11d left",
      badgeBg: "#EEE3FA",
      badgeColor: "#5A10A5",
    },
    {
      id: 4,
      title: "Design System Update",
      committee: "UI/UX",
      date: "Aug 5",
      timeLeft: "13d left",
      badgeBg: "#EEE3FA",
      badgeColor: "#5A10A5",
    },
    {
      id: 5,
      title: "Member Orientation",
      committee: "HR",
      date: "Aug 12",
      timeLeft: "20d left",
      badgeBg: "#EEE3FA",
      badgeColor: "#5A10A5",
    },
  ];

  return (
    <div className="bg-white border border-purple-100/80 rounded-3xl p-6 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-900">
          Upcoming Deadlines
        </h3>
        <Calendar className="w-4 h-4 text-[#5A10A5]" />
      </div>

      <div className="space-y-3.5">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-purple-50/50 transition-colors"
          >
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-gray-900 leading-snug truncate">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-50 text-amber-700">
                  {item.committee}
                </span>
                <span className="text-[11px] font-medium text-gray-400">
                  {item.date}
                </span>
              </div>
            </div>

            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold shrink-0"
              style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}
            >
              {item.timeLeft}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onViewAllClick}
        className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5A10A5] font-bold text-xs transition-colors cursor-pointer border-0 flex items-center justify-center gap-1"
      >
        View All Deadlines →
      </button>
    </div>
  );
}

export default UpcomingDeadlines;
