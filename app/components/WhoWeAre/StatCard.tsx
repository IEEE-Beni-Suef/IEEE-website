import React from "react";

export interface StatCardProps {
  number: string;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={{
        background: "#FFFFFF",
        borderTop: "0.8px solid #4460EF1A",
        boxShadow: "0px 2px 16px 0px #4460EF14",
        borderRadius: "14px",
        overflow: "hidden",
      }}
    >
      {/* Stat Number */}
      <span
        style={{
          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          fontWeight: 900,
          fontStyle: "normal",
          fontSize: "36px",
          lineHeight: "40px",
          letterSpacing: "0px",
          textAlign: "center",
          color: "#4460EF",
        }}
      >
        {number}
      </span>

      {/* Stat Label */}
      <span
        style={{
          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          fontWeight: 600,
          fontStyle: "normal",
          fontSize: "12px",
          lineHeight: "18px",
          letterSpacing: "0px",
          textAlign: "center",
          color: "#4460EF",
          marginTop: "4px",
        }}
      >
        {label}
      </span>

      {/* Bottom Gradient Line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #5A10A5 0%, #4460EF 100%)",
          borderRadius: "1px",
        }}
      />
    </div>
  );
};

export default StatCard;
