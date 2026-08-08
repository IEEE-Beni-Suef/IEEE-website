import React from "react";

export interface ArticleStatsBoxProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  subtext?: string;
  className?: string;
}

export function ArticleStatsBox({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  subtext,
  className = "",
}: ArticleStatsBoxProps) {
  return (
    <div
      className={`rounded-2xl border border-purple-100/80 bg-white p-4 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <div className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          {value}
        </p>
        {subtext && (
          <p className="mt-1 text-[10px] font-semibold text-gray-400 truncate">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

