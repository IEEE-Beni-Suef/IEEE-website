import React from "react";
import { useTheme } from "~/hooks/useTheme";

interface CommitteesStatsBoxProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export const CommitteesStatsBox: React.FC<CommitteesStatsBoxProps> = ({
  title,
  value,
  subtext,
  icon,
  iconBgColor = "bg-[#F4EBFF]",
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isDark
          ? "bg-[#101726] border-[#232D42] shadow-none"
          : "bg-[#FEFEFF] border-[#EEF0FF] shadow-[0px_4px_20px_0px_#0006400F]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgColor} `}
        >
          {icon}
        </div>
      </div>
      <div>
        <span
          className={`text-[11px] font-bold tracking-wider uppercase block ${
            isDark ? "text-gray-400" : "text-[#6C757D]"
          }`}
        >
          {title}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span
            className={`text-2xl font-extrabold ${
              isDark ? "text-white" : "text-[#000640]"
            }`}
          >
            {value}
          </span>
        </div>
        <p
          className={`text-xs font-normal mt-1 ${
            isDark ? "text-gray-400" : "text-[#6C757D]"
          }`}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default CommitteesStatsBox;
