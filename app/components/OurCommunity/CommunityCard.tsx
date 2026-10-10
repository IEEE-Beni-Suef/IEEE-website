import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface CommunityCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  themeColor: "#5A10A5" | "#4460EF" | "#0E2C5E";
  bgStyle?: {
    background: string;
    borderTop: string;
    border: string;
    color: string;
  };
  bgWatermark?: React.ReactNode;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  tags,
  themeColor = "#5A10A5",
  bgWatermark,
}) => {
  // Theme color maps for background tint, border, and text
  const themeStyles = {
    "#5A10A5": {
      bg: "#5A10A51A",
      border: "0.8px solid #5A10A540",
      text: "#5A10A5",
    },
    "#4460EF": {
      bg: "#4460EF1A",
      border: "0.8px solid #4460EF40",
      text: "#4460EF",
    },
    "#0E2C5E": {
      bg: "#0E2C5E1A",
      border: "0.8px solid #0E2C5E33",
      text: "#0E2C5E",
    },
  };

  const activeTheme = themeStyles[themeColor] || themeStyles["#5A10A5"];

  return (
    <div
      className="relative flex flex-col justify-between p-6 sm:p-8 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
      style={{
        width: "100%",
        minHeight: "300px",
        borderRadius: "16px",
        border: "0.8px solid #E2E8F0",
        overflow: "hidden",
      }}
    >
      {/* Background Graphic Watermark if provided */}
      {bgWatermark && (
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 sm:opacity-30 z-0">
          {bgWatermark}
        </div>
      )}

      {/* Top Floating Arrow Icon */}
      <div className="absolute top-6 right-6 z-10 text-gray-400 group-hover:text-gray-700 transition-colors">
        <ArrowUpRight className="w-5 h-5" />
      </div>

      {/* Top Section: Icon, Title, Subtitle, Description */}
      <div className="relative z-10 space-y-4">
        {/* Icon Container Div */}
        <div
          className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: activeTheme.bg,
            border: activeTheme.border,
            borderTop: activeTheme.border,
            color: activeTheme.text,
          }}
        >
          {icon}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h3
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              fontWeight: 900,
              fontStyle: "normal",
              fontSize: "30px",
              lineHeight: "36px",
              letterSpacing: "0px",
              color: "#000640",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0px",
              color: activeTheme.text,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Description Paragraph */}
        <p
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "14px",
            lineHeight: "22.75px",
            letterSpacing: "0px",
            color: "#5A6A8A",
          }}
          className="max-w-lg"
        >
          {description}
        </p>
      </div>

      {/* Bottom Section: Examples / Tags Pills */}
      <div className="relative z-10 flex flex-wrap gap-2 pt-4">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-bold transition-transform duration-200 hover:scale-105"
            style={{
              borderRadius: "26843500px",
              background: activeTheme.bg,
              border: activeTheme.border,
              borderTop: activeTheme.border,
              color: activeTheme.text,
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0px",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCard;
