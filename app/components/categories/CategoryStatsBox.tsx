import React from "react";

export interface CategoryStatsBoxProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  numberColor?: string;
  className?: string;
}

export const CategoryStatsBox: React.FC<CategoryStatsBoxProps> = ({
  label,
  value,
  subtext,
  icon,
  iconBg,
  iconColor,
  numberColor,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl p-5 border border-purple-100/80 bg-white transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center justify-between gap-4 ${className}`}
    >
      <div className="space-y-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <h4
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: numberColor || iconColor }}
        >
          {value}
        </h4>
        <p className="text-[11px] font-medium text-gray-400">{subtext}</p>
      </div>

      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform hover:scale-105"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <div className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default CategoryStatsBox;
