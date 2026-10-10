import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Compass, UserPlus } from "lucide-react";

// Fallback user avatar images
import img1 from "../../assets/images/heroImage1.png";
import img2 from "../../assets/images/heroImage2.png";
import img3 from "../../assets/images/heroImage3.png";
import img4 from "../../assets/images/heroImage4.png";

const userAvatars = [img1, img2, img3, img4];

export default function HeroMainText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center gap-7 pt-[40px] sm:pt-[50px] md:pt-[60px] pb-2 px-4"
    >
      {/* Main Title & Subtitles */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[88px] font-black tracking-tight leading-[1.1]">
          <span className="text-[#4460EF]">IEEE</span>{" "}
          <span className="text-[#FEFEFF]">Beni-Suef</span>
          <br />
          <span className="text-[#FEFEFF]">Student Branch</span>
        </h1>

        {/* Subtitle line */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FEFEFF] pt-1">
          Empowering Students.{" "}
          <span className="text-[#4460EF]">Building Tomorrow.</span>
        </h2>

        {/* Description paragraph */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#FEFEFF] max-w-3xl mx-auto leading-relaxed opacity-95 font-normal pt-2">
          A community where technology, leadership, and innovation come together — and students become the builders of the future.
        </p>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
        {/* Explore Our Journey Button */}
        <Link
          to="/about"
          style={{
            height: "48px",
            borderRadius: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
            backgroundColor: "#ECEFFD",
            color: "#4460EF",
            borderWidth: "1px",
            borderColor: "transparent",
            opacity: 1,
          }}
          className="inline-flex items-center justify-center gap-2.5 text-base sm:text-lg font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#4460EF]/30 hover:scale-[1.03] active:scale-[0.98]"
        >
          <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#4460EF]" />
          <span>Explore Our Journey</span>
        </Link>

        {/* Join IEEE Button */}
        <Link
          to="/register"
          style={{
            height: "48px",
            borderRadius: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
            backgroundColor: "transparent",
            color: "#FEFEFF",
            borderWidth: "2px",
            borderColor: "rgba(255, 255, 255, 0.45)",
            opacity: 1,
          }}
          className="inline-flex items-center justify-center gap-2.5 text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white hover:scale-[1.03] active:scale-[0.98]"
        >
          <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-[#FEFEFF]" />
          <span>Join IEEE</span>
        </Link>
      </div>

      {/* User Avatars & Branch Description */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
        <div className="flex -space-x-3 overflow-hidden py-1">
          {userAvatars.map((src, i) => (
            <img
              key={`user-avatar-${i}`}
              src={src}
              alt={`IEEE Member ${i + 1}`}
              className="inline-block w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border-2 border-[#0E2C5E] object-cover shadow-md transition-transform duration-300 hover:scale-110 hover:z-30"
            />
          ))}
        </div>
        <p className="text-sm sm:text-base md:text-lg text-[#FEFEFF] font-medium">
          <span className="font-bold text-[#FEFEFF]">Students across disciplines</span>{" "}
          <span className="font-normal text-[#FEFEFF]/90">— one branch.</span>
        </p>
      </div>
    </motion.div>
  );
}
