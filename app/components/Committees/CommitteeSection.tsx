import { useState, type MouseEvent } from "react";
import CommitteesSwipper from "./CommitteeSwipper";
import CommitteeToggleButton from "./CommitteeToggleButton";
import type { Committee } from "~/types";

import aiImg from "~/assets/images/Committees/AI.png";
import astronomyImg from "~/assets/images/Committees/Astronomy.png";
import backendImg from "~/assets/images/Committees/Backend.png";
import cyberSecurityImg from "~/assets/images/Committees/CyberSecurity.png";
import dataAnalysisImg from "~/assets/images/Committees/DataAnalysis.png";
import entrepreneurshipImg from "~/assets/images/Committees/Entrepreneurship.png";
import frontendImg from "~/assets/images/Committees/Frontend.png";
import generalImg from "~/assets/images/Committees/General.png";
import graphicDesignImg from "~/assets/images/Committees/GraphicDesign.png";
import hrImg from "~/assets/images/Committees/HR.png";
import prImg from "~/assets/images/Committees/PR.png";
import socialMediaImg from "~/assets/images/Committees/SocialMedia.png";

interface IProps {
  committees?: Committee[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const defaultTechnicalCommittees: Committee[] = [
  {
    id: 1,
    name: "AI",
    description:
      "Focuses on artificial intelligence, machine learning, deep learning, and intelligent system development.",
    imageUrl: aiImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 2,
    name: "Astronomy",
    description:
      "Explores space science, astrophysics, stargazing events, and scientific space exploration.",
    imageUrl: astronomyImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 3,
    name: "Backend",
    description:
      "Powers digital infrastructure, builds robust server systems, APIs, databases, and core application logic.",
    imageUrl: backendImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 4,
    name: "Cyber Security",
    description:
      "Focuses on information security, ethical hacking, network defense, and protecting digital assets.",
    imageUrl: cyberSecurityImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 5,
    name: "Data Analysis",
    description:
      "Extracts insights from complex datasets using statistical modeling, data visualization, and analytics.",
    imageUrl: dataAnalysisImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 6,
    name: "Frontend",
    description:
      "Crafts intuitive, responsive, and visually stunning web interfaces and client-side applications.",
    imageUrl: frontendImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
];

const defaultOperationalCommittees: Committee[] = [
  {
    id: 7,
    name: "Entrepreneurship",
    description:
      "Fosters business acumen, startup culture, pitch competitions, and entrepreneurial mindsets.",
    imageUrl: entrepreneurshipImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 8,
    name: "General",
    description:
      "Coordinates inter-committee activities, branch operations, event support, and member engagement.",
    imageUrl: generalImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 9,
    name: "Graphic Design",
    description:
      "Creates visual branding, promotional graphics, UI assets, and creative design materials.",
    imageUrl: graphicDesignImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 10,
    name: "HR",
    description:
      "Manages recruitment, member evaluation, team dynamics, internal communications, and member welfare.",
    imageUrl: hrImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 11,
    name: "PR",
    description:
      "Handles public relations, media coverage, sponsorships, speaker outreach, and external partnerships.",
    imageUrl: prImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
  {
    id: 12,
    name: "Social Media",
    description:
      "Drives digital presence, content strategy, social media campaigns, and online audience engagement.",
    imageUrl: socialMediaImg,
    headId: 0,
    vicesId: [],
    memberCount: 0,
  },
];

const CommitteesSection = ({}: IProps = {}) => {
  const [commmitteList, setCommmitteList] = useState<
    "technicalcommittees" | "operationalcommittees"
  >("technicalcommittees");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newCommmitteList: "technicalcommittees" | "operationalcommittees",
  ) => {
    if (newCommmitteList !== null) {
      setCommmitteList(newCommmitteList);
    }
  };

  const currentDisplayList =
    commmitteList === "technicalcommittees"
      ? defaultTechnicalCommittees
      : defaultOperationalCommittees;

  return (
    <div>
      {/* BUTTONS */}
      <CommitteeToggleButton
        commmitteList={commmitteList}
        handleChange={handleChange}
      />

      {/* COMMITTEES SWIPER */}
      <CommitteesSwipper data={currentDisplayList} />
    </div>
  );
};

export default CommitteesSection;
