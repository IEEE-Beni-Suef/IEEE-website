import React, { useMemo } from "react";
import { CheckSquare, ArrowRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import { useCommittees, useAllMeetings } from "~/hooks/useApi";

interface TopCommitteesTasksWidgetProps {
  onViewFullReport: () => void;
}

const COLORS = ["#3B82F6", "#7C3AED", "#EA580C", "#0D9488", "#16A34A", "#DC2626"];

export const TopCommitteesTasksWidget: React.FC<TopCommitteesTasksWidgetProps> = ({
  onViewFullReport,
}) => {
  const { isDark } = useTheme();
  const { data: committees = [] } = useCommittees();
  const { data: meetings = [] } = useAllMeetings();

  const tasksData = useMemo(() => {
    if (!committees || committees.length === 0) return [];

    const list = committees.map((c: any, idx: number) => {
      const committeeMeetings = Array.isArray(meetings)
        ? meetings.filter((m: any) => m.committeeId === c.id).length
        : 0;
      const totalCount = committeeMeetings || c.memberCount || 1;
      return {
        name: c.name,
        count: totalCount,
        color: COLORS[idx % COLORS.length],
      };
    });

    const maxCount = Math.max(...list.map((item) => item.count), 1);

    return list.map((item) => ({
      name: item.name,
      tasks: `${item.count} Activity`,
      color: item.color,
      width: `${Math.round((item.count / maxCount) * 100)}%`,
    }));
  }, [committees, meetings]);

  return (
    <div
      className={`rounded-3xl border p-5 transition-all flex flex-col justify-between ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-[#EEF0FF] text-[#0D1B3E] shadow-xs"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base">Top Committees by Tasks</h3>
          <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Progress List */}
        <div className="space-y-3.5 my-2">
          {tasksData.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0D1B3E] dark:text-gray-200">
                  {item.name}
                </span>
                <span className="font-extrabold text-gray-500 dark:text-gray-400 text-[11px]">
                  {item.tasks}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#F1F5F9] dark:bg-[#161F33] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ backgroundColor: item.color, width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#232D42]">
        <button
          onClick={onViewFullReport}
          className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? "bg-[#182033] border-[#232D42] text-blue-400 hover:bg-[#1E2738]"
              : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}
        >
          View Full Report
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TopCommitteesTasksWidget;
