import React from "react";
import CommunityCard from "./CommunityCard";

// Custom SVG Icons matching the design in the screenshot exactly
const CsCisIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.66 7L14.6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.4 13.5L3.34 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.34 7L9.4 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.6 13.5L20.66 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AeshIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="3"
      transform="rotate(45 12 12)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const WieIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4V12M12 12L8 8M12 12L16 8M12 12V20M12 20L8 16M12 20L16 16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
  </svg>
);

// Soft background graphic watermarks for design realism
const CsCisWatermark = () => (
  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
    <path
      d="M100 20C140 20 180 50 180 100C180 150 140 180 100 180C60 180 20 150 20 100C20 50 60 20 100 20Z"
      fill="#5A10A5"
      fillOpacity="0.06"
    />
  </svg>
);

const AeshWatermark = () => (
  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="80" stroke="#4460EF" strokeOpacity="0.05" strokeWidth="20" />
  </svg>
);

const SightWatermark = () => (
  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
    <path
      d="M20 100 A80 80 0 0 1 180 100 A80 80 0 0 1 20 100"
      stroke="#0E2C5E"
      strokeOpacity="0.06"
      strokeWidth="12"
      strokeDasharray="10 10"
    />
  </svg>
);

const WieWatermark = () => (
  <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
    <path
      d="M100 30 C150 30 170 80 170 120 C170 160 120 170 100 170 C80 170 30 160 30 120 C30 80 50 30 100 30 Z"
      fill="#5A10A5"
      fillOpacity="0.04"
    />
  </svg>
);

export const OurCommunityGrid: React.FC = () => {
  const cardsData = [
    {
      id: "cs-cis",
      icon: <CsCisIcon />,
      title: "CS / CIS",
      subtitle: "Computer Science & Information Systems",
      description:
        "Bridging theoretical computer science with real-world systems. Members explore software development, data structures, and information systems to build tomorrow's digital infrastructure.",
      tags: ["Software", "Algorithms", "Systems"],
      themeColor: "#5A10A5" as const,
      watermark: <CsCisWatermark />,
    },
    {
      id: "aesh",
      icon: <AeshIcon />,
      title: "AESH",
      subtitle: "Advanced Engineering & Smart Hardware",
      description:
        "Where circuits meet creativity. Focused on electronics, embedded systems, IoT, and smart hardware solutions that redefine how technology interacts with the physical world.",
      tags: ["Electronics", "IoT", "Hardware"],
      themeColor: "#4460EF" as const,
      watermark: <AeshWatermark />,
    },
    {
      id: "sight",
      icon: <SightIcon />,
      title: "SIGHT",
      subtitle: "Special Interest Group on Humanitarian Technology",
      description:
        "Technology in service of humanity. SIGHT unites students around projects addressing real social challenges — connecting engineering skills with community impact and sustainable development.",
      tags: ["Social Impact", "Humanitarian", "Sustainability"],
      themeColor: "#0E2C5E" as const,
      watermark: <SightWatermark />,
    },
    {
      id: "wie",
      icon: <WieIcon />,
      title: "WIE",
      subtitle: "Women in Engineering",
      description:
        "Championing diversity in STEM and amplifying women's voices in engineering. WIE creates a supportive environment for women to grow, lead, and thrive in technology-driven careers.",
      tags: ["Diversity", "Leadership", "STEM"],
      themeColor: "#5A10A5" as const,
      watermark: <WieWatermark />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {cardsData.map((card) => (
        <CommunityCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          tags={card.tags}
          themeColor={card.themeColor}
          bgWatermark={card.watermark}
        />
      ))}
    </div>
  );
};

export default OurCommunityGrid;
