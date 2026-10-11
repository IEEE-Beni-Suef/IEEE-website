import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AmbassadorCard from "./AmbassadorCard";
import { ambassadors, type Ambassador } from "~/data/ambassadors";

export const AmbassadorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { amount: 0.2 });

  // Scroll animation setup for the connection arc
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const pathLength = shouldReduceMotion ? 1 : smoothProgress;

  // Pagination configuration
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [previewAmbassador, setPreviewAmbassador] = useState<Ambassador | null>(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(ambassadors.length / itemsPerPage);

  const nextPage = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToPage = useCallback(
    (index: number) => {
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    },
    [currentPage]
  );

  // Auto-slide to the right when user is in the section; loops continuously
  useEffect(() => {
    if (!isInView || isPaused || previewAmbassador !== null || totalPages <= 1) {
      return;
    }

    const interval = setInterval(() => {
      nextPage();
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPaused, previewAmbassador, totalPages, nextPage]);

  // Current page cards
  const currentAmbassadors = ambassadors.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Framer Motion slide variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 70 : -70,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -70 : 70,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="max-w-[1060px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10 md:mb-12">
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
              fontFamily: "Montserrat, sans-serif",
              color: "#4460EF",
              lineHeight: "1.6",
              fontWeight: 500,
            }}
          >
            Our students don't just participate — they represent.
          </p>
        </div>

        {/* ── Main Connection Banner Div ── */}
        <div
          className="relative w-full max-w-[1060px] min-h-[300px] rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl mb-12 flex flex-col justify-between"
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
            {/* SVG Scroll-Animated Arc Line Starting at Circle 1 (295, 155) & Ending at Circle 2 (705, 115) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 220"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Faint Path */}
              <path
                d="M 295 155 Q 500 50 705 115"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Scroll-Progressive Animated Line */}
              <motion.path
                d="M 295 155 Q 500 50 705 115"
                stroke="url(#arc-gradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="50%" stopColor="#4460EF" />
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
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "15.66px",
                  lineHeight: "100%",
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
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "15.66px",
                    lineHeight: "100%",
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                  className="whitespace-nowrap"
                >
                  IEEE Region 8
                </h4>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "100%",
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

        {/* ── Ambassadors Cards Grid / Animated Pagination ── */}
        <div
          ref={cardsContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-[1060px]"
        >
          {/* Side navigation arrows for desktop */}
          <button
            onClick={prevPage}
            aria-label="Previous Page"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-[#5A10A5] items-center justify-center shadow-lg hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPage}
            aria-label="Next Page"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-[#5A10A5] items-center justify-center shadow-lg hover:bg-[#5A10A5] hover:text-white hover:border-[#5A10A5] active:scale-95 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container with AnimatePresence */}
          <div className="overflow-hidden py-2 px-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
              >
                {currentAmbassadors.map((amb: Ambassador) => (
                  <AmbassadorCard
                    key={amb.id}
                    id={amb.id}
                    name={amb.name}
                    place={amb.place}
                    image={amb.image}
                    onPreview={() => setPreviewAmbassador(amb)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Pagination Controls ── */}
        {totalPages > 1 && (
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex flex-col items-center space-y-4 pt-8"
          >
            {/* Pagination Indicator Dots */}
            <div className="flex items-center gap-2.5 bg-purple-50/60 px-4 py-2 rounded-full border border-purple-100/60">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === idx
                      ? "w-7 h-2.5 bg-[#5A10A5] shadow-sm shadow-purple-500/30"
                      : "w-2.5 h-2.5 bg-[#5A10A5]/25 hover:bg-[#5A10A5]/50"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

           
          </div>
        )}
      </div>

      {/* ── Image Lightbox Modal ── */}
      <AnimatePresence>
        {previewAmbassador && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewAmbassador(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewAmbassador(null)}
                aria-label="Close Preview"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image */}
              <div className="relative w-full flex-1 overflow-auto bg-slate-900 flex items-center justify-center">
                <img
                  src={previewAmbassador.image}
                  alt={previewAmbassador.name}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Modal Caption: Title & Place only */}
              <div className="p-5 bg-white border-t border-purple-50 flex flex-col space-y-1">
                <h3
                  className="text-lg font-extrabold text-[#000640]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {previewAmbassador.name}
                </h3>
                <p
                  className="text-xs sm:text-sm font-semibold text-[#5A10A5]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {previewAmbassador.place}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AmbassadorsSection;
