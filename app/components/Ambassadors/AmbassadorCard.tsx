import React, { useState } from "react";
import defaultAvatar from "~/assets/images/heroImage1.png";
import { Maximize2 } from "lucide-react";

export interface AmbassadorProps {
  id?: string;
  name: string;
  place?: string;
  role?: string;
  image: string;
  onPreview?: () => void;
}

export const AmbassadorCard: React.FC<AmbassadorProps> = ({
  name = "IEEE Ambassador",
  place,
  role = "IEEE SAC Ambassador",
  image,
  onPreview,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(image);
  const displayPlace = place || role;

  return (
    <div
      onClick={onPreview}
      className="group relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-xl shadow-purple-900/5 hover:shadow-purple-900/10 border border-purple-100/70 hover:border-purple-300 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5 cursor-pointer select-none"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 mb-3 sm:mb-3.5 border border-purple-50/80">
          <img
            src={imgSrc}
            alt={name}
            onError={() => setImgSrc(defaultAvatar)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* IEEE Badge Overlay Top-Right */}
          <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 flex items-center gap-1 shadow-sm">
            <span className="text-[9px] font-black tracking-widest text-white uppercase">
              IEEE
            </span>
          </div>

          {/* Expand icon on hover */}
          <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>

          {/* Bottom Subtle Gradient Shadow */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
        </div>

        {/* Content Below Photo: Line 1 = Name (Title), Line 2 = Place only */}
        <div className="px-1 pb-1 flex flex-col space-y-1">
          <h3
            className="text-sm sm:text-base font-extrabold text-[#000640] group-hover:text-[#5A10A5] transition-colors truncate"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
            title={name}
          >
            {name}
          </h3>
          <p
            className="text-xs font-semibold text-[#5A10A5] truncate"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
            title={displayPlace}
          >
            {displayPlace}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmbassadorCard;
