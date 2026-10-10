import React from "react";

export interface OurImpactTitleProps {
  categoryText?: string;
  mainTextLine1?: string;
  mainTextLine2?: string;
  subtitle?: string;
}

export const OurImpactTitle: React.FC<OurImpactTitleProps> = ({
  categoryText = "OUR IMPACT",
  mainTextLine1 = "Turning Activities",
  mainTextLine2 = "Into Impact",
  subtitle = "Every event, workshop, and initiative is measured not by its size but by what it enables in students' lives.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10 md:mb-14 max-w-4xl mx-auto">
      {/* Category Sub-header "OUR IMPACT" */}
      <div className="flex flex-col items-center gap-1.5">
        <span
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "10.88px",
            lineHeight: "16.32px",
            letterSpacing: "1.96px",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#5A10A5",
          }}
        >
          {categoryText}
        </span>
        {/* Accent Bar */}
        <div
          style={{
            width: "24px",
            height: "2px",
            backgroundColor: "#5A10A5",
            borderRadius: "1px",
          }}
        />
      </div>

      {/* Main Heading */}
      <h2 className="flex flex-col items-center justify-center text-center">
        <span
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 800,
            fontStyle: "normal",
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: "clamp(36px, 6vw, 60px)",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#5A10A5",
          }}
        >
          {mainTextLine1}
        </span>
        <span
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 800,
            fontStyle: "normal",
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: "clamp(36px, 6vw, 60px)",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#4460EF",
          }}
        >
          {mainTextLine2}
        </span>
      </h2>

      {/* Subtitle Paragraph */}
      <p
        style={{
          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: "18px",
          lineHeight: "29.25px",
          letterSpacing: "0px",
          textAlign: "center",
          color: "#5A6A8A",
        }}
        className="max-w-2xl mx-auto pt-1"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default OurImpactTitle;
