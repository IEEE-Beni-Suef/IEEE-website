import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AmbassadorCard from "./AmbassadorCard";

import img1 from "~/assets/images/heroImage1.png";
import img2 from "~/assets/images/heroImage2.png";
import img3 from "~/assets/images/heroImage3.png";
import img4 from "~/assets/images/heroImage4.png";
import WhoWeAreImage from "~/assets/images/WhoWeAreImage.jpg";

export interface AmbassadorData {
  id: string;
  name: string;
  role: string;
  season: string;
  image: string;
}

const ambassadorsList: AmbassadorData[] = [
  {
    id: "amb-1",
    name: "[ Ambassador Name ]",
    role: "IEEE SAC Ambassador",
    season: "Season 10",
    image: img1,
  },
  {
    id: "amb-2",
    name: "[ Ambassador Name ]",
    role: "IEEE SAC Ambassador",
    season: "Season 10",
    image: img2,
  },
  {
    id: "amb-3",
    name: "[ Ambassador Name ]",
    role: "IEEE SAC Ambassador",
    season: "Season 10",
    image: img3,
  },
  {
    id: "amb-4",
    name: "[ Ambassador Name ]",
    role: "IEEE SAC Ambassador",
    season: "Season 10",
    image: img4,
  },
  {
    id: "amb-5",
    name: "[ Ambassador Name ]",
    role: "IEEE Region 8 Student Representative",
    season: "Season 11",
    image: WhoWeAreImage,
  },
  {
    id: "amb-6",
    name: "[ Ambassador Name ]",
    role: "IEEE WIE Lead Ambassador",
    season: "Season 11",
    image: img1,
  },
  {
    id: "amb-7",
    name: "[ Ambassador Name ]",
    role: "IEEE Technical Society Ambassador",
    season: "Season 10",
    image: img2,
  },
  {
    id: "amb-8",
    name: "[ Ambassador Name ]",
    role: "IEEE Student Branch Ambassador",
    season: "Season 9",
    image: img3,
  },
];

export const AmbassadorsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(ambassadorsList.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentAmbassadors = ambassadorsList.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1060px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 md:mb-12">
          {/* Category Tag */}
          <div className="flex flex-col items-center gap-1.5">
            <span
              style={{
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#5A10A5",
              }}
            >
              AMBASSADORS
            </span>
            <div className="w-6 h-[2px] bg-[#5A10A5] rounded-full" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
            <span style={{ color: "#000640" }}>From Beni-Suef </span>
            <span style={{ color: "#5A10A5" }}>to Region 8</span>
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-2xl text-center text-sm sm:text-base"
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              color: "#4460EF",
              lineHeight: "1.6",
              fontWeight: 500,
            }}
          >
            Our students don't just participate — they represent.
          </p>
        </div>

        {/* ── Main Connection Banner Div (Smaller width: max-w-[1060px]) ── */}
        <div
          className="relative w-full max-w-[1060px] min-h-[300px] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl mb-4 flex flex-col justify-between"
          style={{
            background: "linear-gradient(135deg, #0E2C5E 0%, #1A3A7A 100%)",
            borderTop: "0.8px solid #4460EF33",
          }}
        >
          {/* Subtle Grid Texture Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
              backgroundSize: `48px 48px`,
            }}
          />

          {/* Top Label */}
          <div className="relative z-10 text-center pt-2">
            <span className="text-[11px] font-extrabold tracking-[3px] text-white/40 uppercase">
              OUR AMBASSADORS
            </span>
          </div>

          {/* Connection Arc & Nodes Area */}
          <div className="relative z-10 w-full h-[220px]">
            {/* SVG Solid Arc Line Starting Exactly at Circle 1 Center (295, 155) and Ending at Circle 2 Center (705, 115) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 220"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 295 155 Q 500 50 705 115"
                stroke="url(#arc-gradient)"
                strokeWidth="2.5"
                fill="none"
              />
              <defs>
                <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="60%" stopColor="#4460EF" />
                  <stop offset="100%" stopColor="#00F0FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Left Node: Beni-Suef, Egypt (Dot center matching SVG start: 29.5%, 155px) */}
            <div className="absolute left-[29.5%] top-[155px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center">
              {/* Node Dot Circle */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-purple-500/30 animate-ping" />
                <span className="w-5 h-5 rounded-full bg-[#9333EA] border-2 border-white shadow-lg shadow-purple-500/50" />
              </div>
              {/* Centered Typography for Beni-Suef, Egypt */}
              <h4
                style={{
                  fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "15.66px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  color: "#FFFFFF",
                }}
                className="mt-3 whitespace-nowrap"
              >
                Beni-Suef, Egypt
              </h4>
            </div>

            {/* Right Node: IEEE Region 8 (Dot center matching SVG end: 70.5%, 115px) */}
            <div className="absolute left-[70.5%] top-[115px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center">
              {/* Node Dot Circle */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-10 h-10 rounded-full bg-cyan-400/30 animate-ping" />
                <span className="w-6 h-6 rounded-full bg-[#00F0FF] border-2 border-white shadow-lg shadow-cyan-400/50" />
              </div>
              {/* Centered Typography for IEEE Region 8 */}
              <div className="mt-3 flex flex-col items-center justify-center text-center">
                <h4
                  style={{
                    fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "15.66px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                  className="whitespace-nowrap"
                >
                  IEEE Region 8
                </h4>
                {/* Second Line Centered */}
                <p
                  style={{
                    fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.6)",
                  }}
                  className="mt-1.5 whitespace-nowrap"
                >
                  Europe · Middle East · Africa
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Caption Disclaimer */}
        <p className="text-xs text-gray-400 text-center mb-10 italic">
          Real ambassador profiles, names, and photos will replace these placeholders.
        </p>

        {/* ── Ambassadors Cards Grid / Slider (Smaller width matching banner: max-w-[1060px]) ── */}
        <div className="w-full max-w-[1060px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {currentAmbassadors.map((amb) => (
                <AmbassadorCard
                  key={amb.id}
                  id={amb.id}
                  name={amb.name}
                  role={amb.role}
                  season={amb.season}
                  image={amb.image}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Pagination Controls ── */}
        <div className="flex flex-col items-center space-y-4 pt-10">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === idx
                    ? "w-3 h-3 bg-[#5A10A5] scale-110"
                    : "w-2.5 h-2.5 bg-[#5A10A5]/20 hover:bg-[#5A10A5]/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Prev / Next Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full border border-purple-200 text-[#5A10A5] flex items-center justify-center transition-all duration-300 hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full border border-purple-200 text-[#5A10A5] flex items-center justify-center transition-all duration-300 hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbassadorsSection;
