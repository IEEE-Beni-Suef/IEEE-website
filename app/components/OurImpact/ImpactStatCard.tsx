import React from "react";

export interface ImpactStatCardProps {
  icon?: React.ReactNode;
  value: string;
  label: string;
}

export const ImpactStatCard: React.FC<ImpactStatCardProps> = ({
  icon,
  value,
  label,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-2xl text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
      style={{
        background: "#F3EDFB",
        border: "0.8px solid #5A10A526",
        borderRadius: "16px",
        minHeight: "96px",
      }}
    >
      {/* Top Icon */}
      {icon && (
        <div className="text-[#5A10A5] mb-1 flex items-center justify-center">
          {icon}
        </div>
      )}

      {/* Metric Value */}
      <span
        style={{
          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          fontWeight: 900,
          fontStyle: "normal",
          fontSize: "26px",
          lineHeight: "30px",
          letterSpacing: "0px",
          color: "#000640",
        }}
      >
        {value}
      </span>

      {/* Metric Label */}
      <span
        style={{
          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          fontWeight: 600,
          fontStyle: "normal",
          fontSize: "11.5px",
          lineHeight: "16px",
          letterSpacing: "0px",
          color: "#5A10A5",
          marginTop: "2px",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default ImpactStatCard;
