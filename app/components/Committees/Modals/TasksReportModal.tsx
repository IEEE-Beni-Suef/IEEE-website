import React from "react";
import { X, CheckCircle2, Clock } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface TasksReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TasksReportModal: React.FC<TasksReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const tasksData = [
    { rank: "#1", name: "Web Committee", total: 24, done: 18, pending: 6, color: "#2563EB", width: "100%" },
    { rank: "#2", name: "UI/UX Committee", total: 18, done: 14, pending: 4, color: "#7F56D9", width: "75%" },
    { rank: "#3", name: "PR Committee", total: 15, done: 11, pending: 4, color: "#EA580C", width: "62%" },
    { rank: "#4", name: "CS Committee", total: 14, done: 9, pending: 5, color: "#0891B2", width: "58%" },
    { rank: "#5", name: "HR Committee", total: 12, done: 10, pending: 2, color: "#16A34A", width: "50%" },
    { rank: "#6", name: "Robotics", total: 9, done: 6, pending: 3, color: "#DC2626", width: "37%" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-3xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-extrabold">Top Committees by Tasks — Full Report</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Horizontal Progress Bars */}
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Task Count
            </span>
            <div className="space-y-3">
              {tasksData.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">{item.name}</span>
                    <span>{item.total}</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 dark:bg-[#161F33] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ backgroundColor: item.color, width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Breakdown List */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Breakdown
            </span>
            {tasksData.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-gray-100 dark:border-[#232D42] bg-gray-50/60 dark:bg-[#161F33] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between font-extrabold">
                  <span className="flex items-center gap-1.5">
                    <span className="text-purple-600">{item.rank}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="text-sm font-black">{item.total}</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.done} done
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Clock className="w-3 h-3" />
                    {item.pending} pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksReportModal;
