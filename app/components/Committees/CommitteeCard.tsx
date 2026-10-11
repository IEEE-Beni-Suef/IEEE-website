import { useState } from "react";
import { MoveRight } from "lucide-react";
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
  committee: Committee;
}

export const getCommitteeImage = (name: string, fallbackUrl?: string): string => {
  const normalized = (name || "").toLowerCase().trim();
  if (normalized.includes("ai") || normalized.includes("intelligence")) return aiImg;
  if (normalized.includes("astronomy")) return astronomyImg;
  if (normalized.includes("backend")) return backendImg;
  if (normalized.includes("cyber") || normalized.includes("security")) return cyberSecurityImg;
  if (normalized.includes("data") || normalized.includes("analysis")) return dataAnalysisImg;
  if (normalized.includes("frontend")) return frontendImg;
  if (normalized.includes("entrepreneurship")) return entrepreneurshipImg;
  if (normalized.includes("graphic") || normalized.includes("design")) return graphicDesignImg;
  if (normalized.includes("hr") || normalized.includes("human")) return hrImg;
  if (normalized.includes("pr") || normalized.includes("public")) return prImg;
  if (normalized.includes("social") || normalized.includes("media")) return socialMediaImg;
  if (normalized.includes("general")) return generalImg;

  return fallbackUrl || socialMediaImg;
};

const CommitteeCard = ({ committee }: IProps) => {
  const { name, description, imageUrl } = committee;
  const [imageError, setImageError] = useState(false);

  // Ensure "Committee" is appended nicely if not present
  const displayName = name.toLowerCase().includes("committee")
    ? name
    : `${name} Committee`;

  const handleImageError = () => {
    setImageError(true);
  };

  const resolvedLocalImage = getCommitteeImage(name, imageUrl);
  const finalImageUrl = imageError || !imageUrl ? resolvedLocalImage : imageUrl;

  return (
    <div className="group flex flex-col bg-white rounded-2xl p-4 sm:p-5 border border-[#4460EF]/30 h-[400px] sm:h-[420px] w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container taking full width and height of its div */}
      <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={finalImageUrl}
          alt={`${name} image`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow mt-4">
        <h3 className="font-bold text-lg sm:text-xl text-[#000640] capitalize mb-2 group-hover:text-[#5A10A5] transition-colors">
          {displayName}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-normal line-clamp-3 leading-relaxed pr-1">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex space-x-2 items-center cursor-pointer mt-auto pt-3 w-fit">
          <span className="text-[#5A10A5] font-bold text-xs sm:text-sm">Learn More</span>
          <MoveRight
            size={18}
            color="#5A10A5"
            strokeWidth={2.5}
            className="transform transition-transform group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;
