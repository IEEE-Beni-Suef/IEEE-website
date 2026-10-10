import React from "react";
import { useIntro } from "../../context/IntroContext";
import HeroMainText from "./HeroMainText";
import FHeroImage from "../../assets/images/FHeroImage.png";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { introReady } = useIntro();

  return (
    <section className="relative w-full bg-[#12111F] text-white overflow-hidden flex flex-col items-center justify-start pb-8 pt-16 sm:pt-20">
      {/* ── Background Texture ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: `32px 32px`,
          }}
        />
      </div>

      {/* ── Main Content (Hero Text) ── */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {introReady && <HeroMainText />}
      </div>

      {/* ── Photo Section: Full Width & Compact Spacing with Core Circle Blur Light ── */}
      <div className="relative z-10 w-full max-w-[1150px] mx-auto px-4 mt-2 mb-4 flex flex-col items-center">
        <div className="relative w-full flex justify-center items-center">
          {/* 1. Large High-Blur Ambient Radial Light Pulsing Brighting Higher and Lower */}
          <motion.div
            animate={{
              opacity: [0.35, 0.95, 0.35],
              scale: [0.85, 1.25, 0.85],
              filter: [
                "brightness(0.9) blur(60px)",
                "brightness(2.4) blur(90px)",
                "brightness(0.9) blur(60px)",
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-[84%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 240, 255, 0.95) 0%, rgba(68, 96, 239, 0.85) 35%, rgba(90, 16, 165, 0.45) 70%, transparent 100%)",
            }}
          />

          {/* 2. Concentrated Intense Bright Light Core next to the bottom circle */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              filter: [
                "brightness(1) blur(25px)",
                "brightness(2.8) blur(40px)",
                "brightness(1) blur(25px)",
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-[84%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#00F0FF] pointer-events-none z-0 opacity-90"
          />

          {/* 3. FHeroImage with matching brightness higher/lower animation */}
          <motion.img
            src={FHeroImage}
            alt="IEEE Branch Network Diagram"
            animate={{
              filter: [
                "brightness(0.95) drop-shadow(0 0 15px rgba(68, 96, 239, 0.35))",
                "brightness(1.25) drop-shadow(0 0 45px rgba(0, 240, 255, 0.85))",
                "brightness(0.95) drop-shadow(0 0 15px rgba(68, 96, 239, 0.35))",
              ],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-full h-auto object-contain max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}