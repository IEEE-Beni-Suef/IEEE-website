import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight, Sparkles } from "lucide-react";

export interface JourneySeason {
  id: string;
  seasonNumber: string;
  title: string;
  points: string[];
}

const seasonsData: JourneySeason[] = [
  {
    id: "season-8",
    seasonNumber: "Season 8",
    title: "Season 8",
    points: [
      "Strengthening our community through collaboration and teamwork.",
      "Creating opportunities for technical learning and personal development.",
      "Encouraging members to explore new ideas and challenge themselves.",
      "Building a stronger foundation for future growth.",
    ],
  },
  {
    id: "season-9",
    seasonNumber: "Season 9",
    title: "Season 9",
    points: [
      "Expanding opportunities for learning, collaboration, and innovation.",
      "Bringing students together through shared interests and ambitions.",
      "Encouraging active participation in technical and organizational activities.",
      "Creating new possibilities for growth and community engagement.",
    ],
  },
  {
    id: "season-10",
    seasonNumber: "Season 10",
    title: "Season 10",
    points: [
      "Encouraging innovation and creative problem-solving.",
      "Supporting members in developing their technical and leadership skills.",
      "Promoting teamwork through shared projects and initiatives.",
      "Creating meaningful experiences that inspire continuous learning.",
    ],
  },
  {
    id: "season-11",
    seasonNumber: "Season 11",
    title: "Season 11",
    points: [
      "Building on the experience and progress of previous seasons.",
      "Empowering members to grow, lead, and make an impact.",
      "Pursuing new opportunities for collaboration and innovation.",
      "Shaping the next chapter of IEEE Beni Suef Student Branch.",
    ],
  },
];

export const OurJourneySection: React.FC = () => {
  const [activeSeasonId, setActiveSeasonId] = useState<string>("season-8");

  const activeSeason =
    seasonsData.find((s) => s.id === activeSeasonId) || seasonsData[0];

  return (
    <section id="about" className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 md:mb-12">
          {/* Icon & Category Tag */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#5A10A5]/10 flex items-center justify-center text-[#5A10A5]">
              <Globe className="w-5 h-5 text-[#5A10A5]" />
            </div>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#5A10A5",
              }}
            >
              TIMELINE
            </span>
            <div className="w-6 h-[2px] bg-[#5A10A5] rounded-full" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
            <span style={{ color: "#000640" }}>Our </span>
            <span style={{ color: "#4460EF" }}>Journey</span>
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-2xl text-center text-sm sm:text-base"
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "#5A6A8A",
              lineHeight: "1.6",
            }}
          >
            Four seasons. Continuous growth. One story — still being written.
          </p>

          {/* Season Filter Pills / Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {seasonsData.map((season) => {
              const isActive = season.id === activeSeasonId;
              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeasonId(season.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#5A10A5] text-white shadow-lg shadow-[#5A10A5]/30 scale-105"
                      : "bg-[#5A10A5]/5 text-[#5A6A8A] hover:bg-[#5A10A5]/10 hover:text-[#5A10A5]"
                  }`}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {season.seasonNumber}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Container (Left Stepper + Right Season Details Card) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mt-4 max-w-4xl">
          {/* Left Stepper Timeline (4 cols on md+) */}
          <div className="md:col-span-4 flex flex-col space-y-6 relative pl-4 border-l-2 border-purple-100">
            {seasonsData.map((season) => {
              const isActive = season.id === activeSeasonId;
              return (
                <button
                  key={season.id}
                  onClick={() => setActiveSeasonId(season.id)}
                  className={`relative flex items-center gap-4 text-left group transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* Timeline Node Circle */}
                  <div
                    className={`absolute -left-[23px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-[#5A10A5] border-[#5A10A5] ring-4 ring-[#5A10A5]/20 scale-125"
                        : "bg-white border-purple-300 group-hover:border-[#5A10A5]"
                    }`}
                  />

                  {/* Label */}
                  <div className="flex flex-col pl-2">
                    <span
                      className={`text-sm font-bold transition-colors ${
                        isActive ? "text-[#5A10A5]" : "text-gray-600 group-hover:text-[#5A10A5]"
                      }`}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {season.seasonNumber}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Card (8 cols on md+) */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-purple-500/5 border border-purple-100/80 overflow-hidden"
              >
                {/* Season Title */}
                <h3
                  className="text-2xl font-extrabold text-[#000640] mb-5"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {activeSeason.title}
                </h3>

                {/* Bullet Points */}
                <ul className="space-y-3">
                  {activeSeason.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A10A5] mt-2 flex-shrink-0" />
                      <span
                        className="text-sm text-[#5A6A8A] leading-relaxed"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourneySection;
