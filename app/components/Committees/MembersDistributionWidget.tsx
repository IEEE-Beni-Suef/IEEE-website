import React, { useMemo } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import { useCommittees, useAllUsers } from "~/hooks/useApi";

interface MembersDistributionWidgetProps {
  onViewFullReport: () => void;
}

const COLORS = ["#2563EB", "#7F56D9", "#DC2626", "#16A34A", "#EA580C", "#0891B2", "#D97706"];

export const MembersDistributionWidget: React.FC<MembersDistributionWidgetProps> = ({
  onViewFullReport,
}) => {
  const { isDark } = useTheme();
  const { data: committees = [] } = useCommittees();
  const { data: allUsers = [] } = useAllUsers();

  const data = useMemo(() => {
    if (!committees || committees.length === 0) return [];
    return committees.map((c: any, idx: number) => {
      const userCount = Array.isArray(allUsers)
        ? allUsers.filter((u: any) => u.committeesId && Array.isArray(u.committeesId) && u.committeesId.includes(c.id)).length
        : c.memberCount || 0;
      return {
        name: c.name.replace(/committee/i, "").trim(),
        count: userCount || c.memberCount || 1,
        color: COLORS[idx % COLORS.length],
      };
    });
  }, [committees, allUsers]);

  const totalMembers = useMemo(() => {
    return data.reduce((acc, item) => acc + item.count, 0);
  }, [data]);

  return (
    <div
      className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-[#EEF0FF] text-[#000640]"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">Members Distribution</h3>
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>

        {/* Donut Chart SVG Container */}
        <div className="flex justify-center my-4 relative">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
            {data.map((item, idx) => {
              const pct = totalMembers > 0 ? (item.count / totalMembers) * 100 : 0;
              const prevPctSum = data.slice(0, idx).reduce((acc, curr) => acc + (totalMembers > 0 ? (curr.count / totalMembers) * 100 : 0), 0);
              return (
                <circle
                  key={idx}
                  cx="18"
                  cy="18"
                  r="14"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="5"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeDashoffset={-prevPctSum}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-semibold text-gray-400">Total</span>
            <span className="text-sm font-extrabold">{totalMembers}</span>
          </div>
        </div>

        {/* Legend grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-gray-50 dark:bg-[#161F33]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
              </div>
              <span className="font-bold shrink-0 ml-1">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#232D42]">
        <button
          onClick={onViewFullReport}
          className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
            isDark
              ? "bg-[#182033] border-[#232D42] text-purple-300 hover:bg-[#1E2738]"
              : "bg-white border-[#5A10A5] text-[#5A10A5] hover:bg-purple-50"
          }`}
        >
          View Full Report
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default MembersDistributionWidget;
