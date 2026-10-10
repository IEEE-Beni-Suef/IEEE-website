import React from "react";

export interface WhoWeAreTitleProps {
  categoryText?: string;
  mainTextLine1?: string;
  mainTextLine2?: string;
}

export const WhoWeAreTitle: React.FC<WhoWeAreTitleProps> = ({
  categoryText = "WHO WE ARE",
  mainTextLine1 = "More Than a",
  mainTextLine2 = "Student Branch.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 md:mb-14">
      {/* Category Sub-header "WHO WE ARE" */}
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
        {/* Accent Bar under WHO WE ARE */}
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
            color: "#000640",
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
            color: "#5A10A5",
          }}
        >
          {mainTextLine2}
        </span>
      </h2>
    </div>
  );
};

export default WhoWeAreTitle;
