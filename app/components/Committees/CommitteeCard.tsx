import { MoveRight } from "lucide-react";
import { useState } from "react";
import type { Committee } from "~/types";

interface IProps {
  committee: Committee;
}

const DEFAULT_IMAGE = "/SocialMedia.png";

const CommitteeCard = ({ committee }: IProps) => {
  const { name, description, imageUrl } = committee;
  const [imageError, setImageError] = useState(false);

  // Ensure "Committee" is appended nicely
  const displayName = name.toLowerCase().includes("committee")
    ? name
    : `${name} Committee`;

  const handleImageError = () => {
    setImageError(true);
  };

  const finalImageUrl = imageError || !imageUrl ? DEFAULT_IMAGE : imageUrl;

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 border border-gray-200 h-[460px] w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-52 rounded-xl overflow-hidden shrink-0 bg-gray-100">
        <img
          className="w-full h-full object-cover"
          src={finalImageUrl}
          alt={`${name} image`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow mt-5">
        <h2 className="font-bold text-lg text-[#1E1E2F] capitalize mb-3">
          {displayName}
        </h2>
        <p className="text-sm text-gray-500 font-medium line-clamp-5 leading-relaxed pr-2">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex space-x-2 items-center cursor-pointer mt-auto pt-4 group w-fit">
          <span className="text-[#5A10A5] font-bold text-sm">Learn More</span>
          <MoveRight
            size={18}
            color="#5A10A5"
            strokeWidth={2.5}
            className="transform transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CommitteeCard;
