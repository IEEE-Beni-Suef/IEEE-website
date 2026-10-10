import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight, Sparkles } from "lucide-react";

export interface JourneySeason {
  id: string;
  seasonNumber: string;
  tag: string;
  badge: string;
  title: string;
  points: string[];
  footerNote: string;
}

const seasonsData: JourneySeason[] = [
  {
    id: "season-8",
    seasonNumber: "Season 8",
    tag: "FOUNDATION",
    badge: "Official Branch Launch",
    title: "Season 8",
    points: [
      "Branch establishment and official IEEE affiliation",
      "Founding committees formed across technical and organizational tracks",
      "First set of technical workshops and orientation events",
      "Initial community partnerships and outreach efforts",
    ],
    footerNote: "Real season data and verified achievements will replace these placeholders.",
  },
  {
    id: "season-9",
    seasonNumber: "Season 9",
    tag: "EXPANSION",
    badge: "Community Growth",
    title: "Season 9",
    points: [
      "Expanded member intake reaching over 150+ active student members",
      "Launched first annual Hackathon and technical competition series",
      "Established partnerships with local tech companies and university labs",
      "Introduced specialized track workshops in Web, AI, and Embedded Systems",
    ],
    footerNote: "Real season data and verified achievements will replace these placeholders.",
  },
  {
    id: "season-10",
    seasonNumber: "Season 10",
    tag: "INNOVATION",
    badge: "Regional Recognition",
    title: "Season 10",
    points: [
      "Achieved top ranking in IEEE Region 8 Student Branch Exemplary Award",
      "Hosted multi-university tech summit with 500+ attendees",
      "Formed dedicated research and development project teams",
      "Strengthened alumni network and career mentorship programs",
    ],
    footerNote: "Real season data and verified achievements will replace these placeholders.",
  },
  {
    id: "season-11",
    seasonNumber: "Season 11",
    tag: "EXCELLENCE",
    badge: "Current Season",
    title: "Season 11",
    points: [
      "Pioneering student-led innovation labs and open-source initiatives",
      "Scaling inter-college technical hackathons and career fairs",
      "Continuous skill empowerment across technical & non-technical societies",
      "Setting new benchmarks for community impact and leadership",
    ],
    footerNote: "Real season data and verified achievements will replace these placeholders.",
  },
];

export const OurJourneySection: React.FC = () => {
  const [activeSeasonId, setActiveSeasonId] = useState<string>("season-8");

  const activeSeason =
    seasonsData.find((s) => s.id === activeSeasonId) || seasonsData[0];

  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
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
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
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
                    fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
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
                        fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                      }}
                    >
                      {season.seasonNumber}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {season.tag}
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
                {/* Header Row: Tag + Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className="text-xs font-extrabold tracking-wider text-[#5A10A5] uppercase"
                    style={{
                      fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    }}
                  >
                    {activeSeason.tag}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#5A10A5]/10 text-[#5A10A5]"
                    style={{
                      fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    }}
                  >
                    {activeSeason.badge}
                  </span>
                </div>

                {/* Season Title */}
                <h3
                  className="text-2xl font-extrabold text-[#000640] mb-5"
                  style={{
                    fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                  }}
                >
                  {activeSeason.title}
                </h3>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-6">
                  {activeSeason.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A10A5] mt-2 flex-shrink-0" />
                      <span
                        className="text-sm text-[#5A6A8A] leading-relaxed"
                        style={{
                          fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Disclaimer / Footer Note */}
                <div className="pt-4 border-t border-purple-50 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <p
                    className="text-xs text-gray-400 italic"
                    style={{
                      fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
                    }}
                  >
                    {activeSeason.footerNote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourneySection;
