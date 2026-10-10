import React from "react";
import { motion } from "framer-motion";

export interface WebsiteTeamMember {
  id: string;
  name: string;
  roleTag: string;
  description: string;
  image: string;
}

export const WebsiteTeamCard: React.FC<WebsiteTeamMember> = ({
  name = "[ Mariam Gamal ]",
  roleTag = "Webmaster",
  description = "Technical direction, architecture & project coordination",
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl p-5 shadow-lg shadow-purple-500/5 border border-purple-100/80 flex flex-col justify-between h-full min-h-[440px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/15 hover:border-purple-200"
    >
      {/* Photo Container */}
      <div className="relative w-full aspect-[4/4.7] rounded-2xl overflow-hidden bg-slate-100 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Role Pill Badge Overlay Bottom-Left of Photo */}
        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center justify-center">
          <span
            className="text-xs font-bold text-white tracking-wide"
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
            }}
          >
            {roleTag}
          </span>
        </div>

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Info Below Photo */}
      <div className="px-1 pb-1 flex flex-col space-y-1">
        <h4
          className="text-base font-extrabold text-[#000640] group-hover:text-[#5A10A5] transition-colors truncate"
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          }}
        >
          {name}
        </h4>
        <p
          className="text-xs text-[#5A6A8A] leading-relaxed line-clamp-2"
          style={{
            fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default WebsiteTeamCard;
