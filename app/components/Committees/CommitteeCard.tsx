import { useState } from "react";
import { MoveRight } from "lucide-react";
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
    <div className="flex flex-col bg-white rounded-[28px] p-5 border border-[#CCB5E3]/80 hover:border-[#5A10A5] h-[460px] w-full shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="w-full h-52 rounded-[20px] overflow-hidden shrink-0 bg-gray-100 relative">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={finalImageUrl}
          alt={`${name} image`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow mt-5">
        <h3 className="font-bold text-xl text-[#000640] capitalize mb-2">
          {displayName}
        </h3>
        <p className="text-sm text-gray-500 font-normal line-clamp-4 leading-relaxed pr-1">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex space-x-2 items-center cursor-pointer mt-auto pt-4 w-fit">
          <span className="text-[#5A10A5] font-bold text-sm">Learn More</span>
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
