import React from "react";
import { X } from "lucide-react";

interface AllDeadlinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllDeadlinesModal: React.FC<AllDeadlinesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const items = [
    {
      id: 1,
      days: "2 days",
      daysColor: "#DC2626",
      daysBg: "#FEE2E2",
      title: "Social Media Campaign",
      committee: "PR",
      priority: "High",
      status: "Overdue",
      date: "Jul 25, 2026",
      dotColor: "#DC2626",
    },
    {
      id: 2,
      days: "7 days",
      daysColor: "#D97706",
      daysBg: "#FEF3C7",
      title: "Website Landing Page Redesign",
      committee: "UI/UX",
      priority: "High",
      status: "In Progress",
      date: "Jul 30, 2026",
      dotColor: "#D97706",
    },
    {
      id: 3,
      days: "11 days",
      daysColor: "#D97706",
      daysBg: "#FEF3C7",
      title: "Robotics Workshop Preparation",
      committee: "Robotics",
      priority: "Medium",
      status: "In Progress",
      date: "Aug 3, 2026",
      dotColor: "#D97706",
    },
    {
      id: 4,
      days: "13 days",
      daysColor: "#4460EF",
      daysBg: "#E8ECFD",
      title: "Design System Update",
      committee: "UI/UX",
      priority: "Medium",
      status: "Review",
      date: "Aug 5, 2026",
      dotColor: "#4460EF",
    },
    {
      id: 5,
      days: "20 days",
      daysColor: "#8B5CF6",
      daysBg: "#F3E8FF",
      title: "New Member Orientation Plan",
      committee: "HR",
      priority: "Low",
      status: "To Do",
      date: "Aug 12, 2026",
      dotColor: "#059669",
    },
    {
      id: 6,
      days: "28 days",
      daysColor: "#059669",
      daysBg: "#D1FAE5",
      title: "IEEE AI Workshop Organization",
      committee: "CS",
      priority: "Low",
      status: "Completed",
      date: "Aug 20, 2026",
      dotColor: "#059669",
    },
    {
      id: 7,
      days: "30 days",
      daysColor: "#059669",
      daysBg: "#D1FAE5",
      title: "Sponsor Outreach Q3",
      committee: "PR",
      priority: "Medium",
      status: "To Do",
      date: "Aug 22, 2026",
      dotColor: "#059669",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-50">
          <div>
            <h2 className="text-xl font-bold tracking-tight">All Upcoming Deadlines</h2>
            <p className="text-xs text-gray-500 mt-1">
              10 deadlines across all committees
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deadlines List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl border border-purple-100/60 bg-purple-50/20 hover:bg-purple-50/60 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-11 h-11 rounded-2xl flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: item.daysBg, color: item.daysColor }}
                >
                  <span className="font-extrabold text-xs leading-none">
                    {item.days.split(" ")[0]}
                  </span>
                  <span className="text-[9px] font-bold uppercase leading-none mt-0.5">
                    days
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="font-extrabold text-xs text-gray-900 leading-snug truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-[#5A10A5]">
                      {item.committee}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-700">
                      {item.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-700">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-gray-900">{item.date}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.dotColor }}
                  />
                  <span className="text-[10px] font-bold text-gray-500">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDeadlinesModal;
