import React from "react";
import { X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface MembersReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembersReportModal: React.FC<MembersReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const items = [
    { name: "Web", count: 42, percent: "19.0%", color: "#2563EB", barHeight: "75%" },
    { name: "UI/UX", count: 38, percent: "17.2%", color: "#7F56D9", barHeight: "68%" },
    { name: "Robotics", count: 45, percent: "20.4%", color: "#DC2626", barHeight: "85%" },
    { name: "HR", count: 31, percent: "14.0%", color: "#16A34A", barHeight: "55%" },
    { name: "PR", count: 29, percent: "13.1%", color: "#EA580C", barHeight: "50%" },
    { name: "CS", count: 36, percent: "16.3%", color: "#0891B2", barHeight: "64%" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-extrabold">Members Distribution — Full Report</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Grid: Chart & Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Donut Chart */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#2563EB" strokeWidth="5" strokeDasharray="21 79" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#7F56D9" strokeWidth="5" strokeDasharray="18 82" strokeDashoffset="-21" />
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#DC2626" strokeWidth="5" strokeDasharray="21 79" strokeDashoffset="-39" />
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#16A34A" strokeWidth="5" strokeDasharray="15 85" strokeDashoffset="-60" />
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#EA580C" strokeWidth="5" strokeDasharray="13 87" strokeDashoffset="-75" />
                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#0891B2" strokeWidth="5" strokeDasharray="17 83" strokeDashoffset="-88" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-400">Total:</span>
                <span className="text-sm font-extrabold">221 members</span>
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Breakdown
            </span>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#161F33]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold">{item.count}</span>
                  <span className="text-[10px] text-gray-400">({item.percent})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Comparison Bar Chart at Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
            Visual Comparison
          </span>
          <div className="h-32 flex items-end justify-between gap-3 px-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{ backgroundColor: item.color, height: item.barHeight }}
                />
                <span className="text-[10px] font-bold text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersReportModal;
