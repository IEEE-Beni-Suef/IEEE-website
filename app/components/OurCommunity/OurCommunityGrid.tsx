import React from "react";
import CommunityCard from "./CommunityCard";

import csIcon from "~/assets/images/Chapter/CS Icon.svg";
import csBg from "~/assets/images/Chapter/CS Background.jpeg";

import aessIcon from "~/assets/images/Chapter/AESS Icon.svg";
import aessBg from "~/assets/images/Chapter/AESS Background.jpeg";

import sightIcon from "~/assets/images/Chapter/SIGHT Icon.svg";
import sightBg from "~/assets/images/Chapter/SIGHT Background.jpeg";

import wieIcon from "~/assets/images/Chapter/WIE Icon.svg";
import wieBg from "~/assets/images/Chapter/WIE backgroud.jpeg";

export const OurCommunityGrid: React.FC = () => {
  const cardsData = [
    {
      id: "cs-cis",
      icon: csIcon,
      bgImage: csBg,
      title: "CS / CIS",
      subtitle: "Computer Science & Information Systems",
      description:
        "Bridging theoretical computer science with real-world systems. Members explore software development, data structures, and information systems to build tomorrow's digital infrastructure.",
      tags: ["Software", "Algorithms", "Systems"],
      themeColor: "#5A10A5" as const,
    },
    {
      id: "aesh",
      icon: aessIcon,
      bgImage: aessBg,
      title: "AESH",
      subtitle: "Advanced Engineering & Smart Hardware",
      description:
        "Where circuits meet creativity. Focused on electronics, embedded systems, IoT, and smart hardware solutions that redefine how technology interacts with the physical world.",
      tags: ["Electronics", "IoT", "Hardware"],
      themeColor: "#4460EF" as const,
    },
    {
      id: "sight",
      icon: sightIcon,
      bgImage: sightBg,
      title: "SIGHT",
      subtitle: "Special Interest Group on Humanitarian Technology",
      description:
        "Technology in service of humanity. SIGHT unites students around projects addressing real social challenges — connecting engineering skills with community impact and sustainable development.",
      tags: ["Social Impact", "Humanitarian", "Sustainability"],
      themeColor: "#0E2C5E" as const,
    },
    {
      id: "wie",
      icon: wieIcon,
      bgImage: wieBg,
      title: "WIE",
      subtitle: "Women in Engineering",
      description:
        "Championing diversity in STEM and amplifying women's voices in engineering. WIE creates a supportive environment for women to grow, lead, and thrive in technology-driven careers.",
      tags: ["Diversity", "Leadership", "STEM"],
      themeColor: "#5A10A5" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {cardsData.map((card) => (
        <CommunityCard
          key={card.id}
          icon={card.icon}
          bgImage={card.bgImage}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          tags={card.tags}
          themeColor={card.themeColor}
        />
      ))}
    </div>
  );
};

export default OurCommunityGrid;
