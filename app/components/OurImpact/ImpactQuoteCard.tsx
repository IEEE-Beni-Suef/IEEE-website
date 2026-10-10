import React from "react";
import { Quote } from "lucide-react";

export interface ImpactQuoteCardProps {
  titleLine1?: string;
  titleLine2?: string;
  paragraph?: string;
}

export const ImpactQuoteCard: React.FC<ImpactQuoteCardProps> = ({
  titleLine1 = "We don't count events.",
  titleLine2 = "We measure what they unlock.",
  paragraph = "Each activity is intentionally designed to open a door — to a skill, a connection, a realization, or a career-defining moment.",
}) => {
  return (
    <div
      className="relative w-full p-6 sm:p-10 rounded-2xl overflow-hidden shadow-sm"
      style={{
        background: "#F3EDFB",
        border: "0.8px solid #5A10A526",
        borderRadius: "20px",
      }}
    >
      {/* Quote Icon */}
      <div className="mb-4 text-[#5A10A5]">
        <Quote className="w-8 h-8 fill-[#5A10A5]/20 text-[#5A10A5]" />
      </div>

      {/* Quote Heading */}
      <div className="space-y-1 mb-3">
        <h3
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 900,
            fontStyle: "normal",
            fontSize: "clamp(20px, 3.5vw, 28px)",
            lineHeight: "clamp(26px, 4vw, 36px)",
            letterSpacing: "0px",
            color: "#000640",
          }}
        >
          {titleLine1}
        </h3>
        <h3
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 900,
            fontStyle: "normal",
            fontSize: "clamp(20px, 3.5vw, 28px)",
            lineHeight: "clamp(26px, 4vw, 36px)",
            letterSpacing: "0px",
            color: "#5A10A5",
          }}
        >
          {titleLine2}
        </h3>
      </div>

      {/* Quote Subtitle / Description */}
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
        className="max-w-2xl"
      >
        {paragraph}
      </p>
    </div>
  );
};

export default ImpactQuoteCard;
