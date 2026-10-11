import React, { useState } from "react";
import { motion } from "framer-motion";
import defaultAvatar from "~/assets/images/heroImage1.png";

export interface AmbassadorProps {
  id: string;
  name: string;
  role: string;
  description?: string;
  season?: string;
  image: string;
}

export const AmbassadorCard: React.FC<AmbassadorProps> = ({
  name = "IEEE Ambassador",
  role = "IEEE SAC Ambassador",
  description,
  season,
  image,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl p-5 shadow-lg shadow-purple-500/5 border border-purple-100/80 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/15 hover:border-purple-200"
    >
      <div>
        {/* Top Image Container */}
        <div className="relative w-full aspect-[4/4.5] rounded-2xl overflow-hidden bg-slate-100 mb-4">
          <img
            src={imgSrc}
            alt={name}
            onError={() => setImgSrc(defaultAvatar)}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* IEEE Badge Overlay Top-Right */}
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1">
            <span className="text-[10px] font-black tracking-widest text-white uppercase">
              IEEE
            </span>
          </div>

          {/* Bottom Subtle Gradient Shadow inside Photo */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Content Below Photo */}
        <div className="px-1 pb-1 flex flex-col space-y-1.5">
          <h4
            className="text-base font-extrabold text-[#000640] group-hover:text-[#5A10A5] transition-colors line-clamp-1"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {name}
          </h4>
          <p
            className="text-xs font-bold text-[#5A10A5]"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {role}
          </p>
          {description && (
            <p
              className="text-xs text-[#5A6A8A] leading-relaxed pt-1 line-clamp-3"
              style={{
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {season && (
        <div className="flex items-center gap-1.5 pt-3 px-1 border-t border-purple-50 mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A10A5]" />
          <span
            className="text-[11px] font-medium text-gray-400"
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {season}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AmbassadorCard;
