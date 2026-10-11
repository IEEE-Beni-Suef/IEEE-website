import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  icon: React.ElementType;
}

const achievementsData: AchievementItem[] = [
  {
    id: "counselor-award",
    title: "Counselor Award",
    category: "Sectional",
    year: "2026",
    description:
      "Acknowledged for organizing the most impactful technical event within the Egypt Section.",
    icon: Star,
  },
  {
    id: "eco-pulse",
    title: "Eco Pulse",
    category: "Competition Win",
    year: "2026",
    description:
      "Secured $1,800 in funding through a competition for a university project, supporting the development of an innovative idea.",
    icon: Trophy,
  },
];

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 md:mb-14">
          {/* Category Tag */}
          <div className="flex flex-col items-center gap-1.5">
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
              ACHIEVEMENTS
            </span>
            <div className="w-6 h-[2px] bg-[#5A10A5] rounded-full" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
            <span style={{ color: "#000640" }}>Milestones </span>
            <span style={{ color: "#5A10A5" }}>We're Proud Of</span>
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
            A record of recognition, innovation, and student-led impact.
          </p>
        </div>

        {/* Cards Grid - Exactly 2 cards centered */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {achievementsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-purple-500/5 border border-purple-100 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200"
              >
                <div>
                  {/* Top Header Row: Icon + Category/Year */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    {/* Icon Square */}
                    <div className="w-12 h-12 rounded-xl bg-[#5A10A5]/10 flex items-center justify-center text-[#5A10A5] transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-[#5A10A5]" />
                    </div>

                    {/* Tag + Year */}
                    <div className="flex flex-col items-end">
                      <span
                        className="text-xs font-bold text-[#5A10A5]"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="text-base font-extrabold text-[#4460EF]"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-extrabold text-[#000640] mb-2 group-hover:text-[#5A10A5] transition-colors"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm text-[#5A6A8A] leading-relaxed mb-6"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent Indicator Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-[#5A10A5] to-[#4460EF] rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
