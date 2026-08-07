import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface EventStatsBoxProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  change?: string | number;
  changeBg?: string;
  changeColor?: string;
  isPositive?: boolean;
  className?: string;
}

export const EventStatsBox: React.FC<EventStatsBoxProps> = ({
  label,
  value,
  icon,
  iconBg = "bg-[#EDE9FE]",
  iconColor = "text-[#6D28D9]",
  change,
  changeBg,
  changeColor,
  isPositive,
  className = "",
}) => {
  // Determine positive/negative from change prop if isPositive is not explicitly passed
  const numericChange =
    typeof change === "number"
      ? change
      : typeof change === "string"
      ? parseFloat(change.replace("%", "").replace("+", ""))
      : undefined;

  const positive = isPositive !== undefined ? isPositive : (numericChange ?? 0) >= 0;

  // Trend indicator colors according to Figma specs
  // Positive: Arrow/Icon #15803D, Text #15803D, BG #DCFCE7
  // Negative: Arrow/Icon #991B1B, Text #991B1B, BG #FEE2E2
  const defaultChangeBg = positive
    ? "bg-[#DCFCE7] text-[#15803D]"
    : "bg-[#FEE2E2] text-[#991B1B]";

  const badgeBgClass = changeBg && changeColor ? `${changeBg} ${changeColor}` : defaultChangeBg;

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border border-purple-100/70 bg-white text-gray-900 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[120px] ${className}`}
    >
      {/* Top Row: Icon Box on Left, Trend Badge on Right */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform hover:scale-105 ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${badgeBgClass}`}
          >
            {positive ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#15803D]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#991B1B]" />
            )}
            <span>
              {typeof change === "number" ? `${change > 0 ? "+" : ""}${change}%` : change}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Section: Label & Value */}
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 truncate">{label}</p>
        <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mt-1">
          {value}
        </h4>
      </div>
    </div>
  );
};

export default EventStatsBox;
