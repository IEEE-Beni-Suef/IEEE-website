import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Compass, UserPlus } from "lucide-react";

export default function HeroMainText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center gap-7 pt-[40px] sm:pt-[50px] md:pt-[60px] pb-4 px-4"
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

        {/* Hero Button: Try Our Dashboard */}
        <Link
          to="/login"
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
          <span>Try Our Dashboard</span>
        </Link>
      </div>
    </motion.div>
  );
}
