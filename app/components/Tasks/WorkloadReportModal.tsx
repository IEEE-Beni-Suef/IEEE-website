import React from "react";
import { X } from "lucide-react";

interface WorkloadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkloadReportModal: React.FC<WorkloadReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const committees = [
    { name: "Web Committee", done: 7, total: 12, percent: 58, color: "#4460EF" },
    { name: "UI/UX Committee", done: 5, total: 8, percent: 63, color: "#5A10A5" },
    { name: "PR Committee", done: 4, total: 9, percent: 44, color: "#D97706" },
    { name: "HR Committee", done: 3, total: 5, percent: 60, color: "#EC4899" },
    { name: "Robotics Committee", done: 2, total: 6, percent: 33, color: "#059669" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-purple-50">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Workload Full Report</h2>
            <p className="text-xs text-gray-500 mt-1">
              Committee task distribution & completion
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

        {/* 3 Top Stat Boxes */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-center">
            <h3 className="text-2xl font-extrabold text-[#5A10A5]">47</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">Total Tasks</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
            <h3 className="text-2xl font-extrabold text-[#059669]">27</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">Completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-center">
            <h3 className="text-2xl font-extrabold text-[#4460EF]">20</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">In Progress</p>
          </div>
        </div>

        {/* Committee Tasks Progress */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            TASKS PER COMMITTEE
          </h4>

          <div className="space-y-4">
            {committees.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-900">{item.name}</span>
                  <span className="text-gray-500 font-semibold">
                    {item.done}/{item.total} done
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                <p
                  className="text-[11px] font-extrabold text-right"
                  style={{ color: item.color }}
                >
                  {item.percent}% complete
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadReportModal;
