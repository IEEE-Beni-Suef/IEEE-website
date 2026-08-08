import React from "react";

export interface TaskStatsBoxProps {
  label: string;
  value: string | number;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  className?: string;
}

export const TaskStatsBox: React.FC<TaskStatsBoxProps> = ({
  label,
  value,
  badgeText,
  badgeBg,
  badgeColor,
  icon,
  iconBg,
  iconColor,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl p-5 border border-purple-100/80 bg-white transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col justify-between space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <div className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center">
            {icon}
          </div>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold shrink-0"
          style={{ backgroundColor: badgeBg, color: badgeColor }}
        >
          {badgeText}
        </span>
      </div>

      <div className="space-y-0.5">
        <h4 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {value}
        </h4>
        <p className="text-xs font-semibold text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default TaskStatsBox;
