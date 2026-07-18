import { useState } from "react";
import { MoveRight } from "lucide-react";
import type { Committee } from "~/types";

interface IProps {
  committee: Committee;
}

// Color palette for fallback placeholders
const placeholderColors = [
  "from-purple-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-teal-500 to-emerald-600",
];

const CommitteeCard = ({ committee }: IProps) => {
  const { name, description, imageUrl } = committee;
  const [imgError, setImgError] = useState(false);

  // Ensure "Committee" is appended nicely
  const displayName = (name || "").toLowerCase().includes("committee")
    ? (name || "")
    : `${name || ""} Committee`;

  // Pick a consistent color based on the committee name
  const colorIndex = (name || "").length % placeholderColors.length;
  const gradientClass = placeholderColors[colorIndex];

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 border border-gray-200 h-[460px] w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-52 rounded-xl overflow-hidden shrink-0 bg-gray-100">
        {!imgError && imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={`${name} image`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
          >
            <span className="text-white text-5xl font-bold opacity-80">
              {(name || "?").charAt(0).toUpperCase()}
            </span>
          </div>
        )}
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
