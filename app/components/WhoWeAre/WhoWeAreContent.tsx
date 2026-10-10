import React from "react";
import WhoWeAreImage from "~/assets/images/WhoWeAreImage.jpg";

export interface WhoWeAreContentProps {
  title?: string;
  imageSrc?: string;
  tags?: string[];
}

export const WhoWeAreContent: React.FC<WhoWeAreContentProps> = ({
  title = "A Community of Builders.",
  imageSrc = WhoWeAreImage,
  tags = ["Technology", "Leadership", "Innovation", "Community", "Collaboration"],
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
      {/* Left Column: Text & Paragraphs & Tags (5 cols on lg) */}
      <div className="lg:col-span-6 space-y-5">
        {/* Sub-heading */}
        <h3
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            fontWeight: 800,
            fontStyle: "normal",
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "0px",
            color: "#000640",
          }}
        >
          {title}
        </h3>

        {/* Paragraphs */}
        <div className="space-y-4">
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
          >
            IEEE Beni-Suef Student Branch is a student-led community at Beni-Suef
            University dedicated to advancing technology, cultivating leadership, and
            driving meaningful change — both on campus and beyond.
          </p>

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
          >
            We bring together students from engineering, computer science, and related
            disciplines to learn, collaborate, and innovate through hands-on workshops,
            technical competitions, community projects, and peer mentorship.
          </p>

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
          >
            From our local campus to{" "}
            <span
              style={{
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "14px",
                lineHeight: "22.75px",
                letterSpacing: "0px",
                color: "#000640",
              }}
            >
              IEEE Region 8
            </span>
            , our members go on to represent, to lead, and to inspire the next generation
            of technology professionals.
          </p>
        </div>

        {/* Pill Tags */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs transition-transform duration-200 hover:scale-105"
              style={{
                background: "#5A10A512",
                borderTop: "0.8px solid #5A10A52E",
                borderLeft: "0.8px solid #5A10A52E",
                borderRight: "0.8px solid #5A10A52E",
                borderBottom: "0.8px solid #5A10A52E",
                color: "#5A10A5",
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Column: Main Image Block with Overlay & Floating Region Badge (6 cols on lg) */}
      <div className="lg:col-span-6 relative pt-4 pr-4">
        {/* Floating "Region 8" Badge Top Right */}
        <div
          className="absolute -top-2 right-2 sm:top-0 sm:right-2 z-20 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
          style={{
            background: "#5A10A5",
            borderRadius: "16px",
            minWidth: "64px",
            padding: "10px 14px",
          }}
        >
          <span
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              fontWeight: 900,
              fontStyle: "normal",
              fontSize: "24px",
              lineHeight: "24px",
              letterSpacing: "0px",
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            8
          </span>
          <span
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "9px",
              lineHeight: "13.5px",
              letterSpacing: "0.72px",
              textAlign: "center",
              textTransform: "uppercase",
              color: "#FFFFFF",
              marginTop: "2px",
            }}
          >
            REGION
          </span>
        </div>

        {/* Main Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-100/50 group">
          {/* Main Image */}
          <img
            src={imageSrc}
            alt="IEEE Beni-Suef Community"
            className="w-full h-auto max-h-[420px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Gradient Overlay Div Front of Big Image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(90, 16, 165, 0.08) 0%, rgba(90, 16, 165, 0) 50%, rgba(14, 44, 94, 0) 50%, rgba(14, 44, 94, 0.25) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreContent;
