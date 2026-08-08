import React from "react";

export interface EmailStatsBoxProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
  iconBackground: string;
  onClick?: () => void;
  active?: boolean;
}

export const EmailStatsBox: React.FC<EmailStatsBoxProps> = ({
  title,
  value,
  icon,
  iconColor,
  iconBackground,
  onClick,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 bg-white rounded-2xl border ${
        active
          ? "border-[#5A10A5] ring-2 ring-[#5A10A5]/20 shadow-md"
          : "border-gray-100 shadow-xs hover:shadow-md"
      } flex items-center justify-between transition-all duration-200 ${
        onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
      }`}
    >
      <div className="space-y-1">
        <p
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: "#6C757D" }}
        >
          {title}
        </p>
        <h3
          className="text-3xl font-extrabold"
          style={{ color: "#000640" }}
        >
          {value}
        </h3>
      </div>
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: iconBackground }}
      >
        {React.isValidElement(icon) ? (
          React.cloneElement(icon as React.ReactElement<{ style?: React.CSSProperties; className?: string }>, {
            style: { color: iconColor },
            className: "w-6 h-6",
          })
        ) : (
          <span style={{ color: iconColor }}>{icon}</span>
        )}
      </div>
    </div>
  );
};

export default EmailStatsBox;
