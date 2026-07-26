import SponsorsSection from "~/components/Sponsors/SponserSection";

const StarSparkle = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`absolute pointer-events-none text-[#CCB5E3] opacity-60 animate-pulse ${className}`}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

const Sponsers = () => {
  return (
    <section
      className="relative bg-white py-20 w-full px-4 md:px-10 overflow-hidden font-sans"
      id="sponsors"
    >
      {/* Decorative Star Sparkles */}
      <StarSparkle className="w-7 h-7 top-10 left-10" />
      <StarSparkle className="w-5 h-5 top-28 right-16" />
      <StarSparkle className="w-6 h-6 bottom-16 left-1/4" />
      <StarSparkle className="w-8 h-8 bottom-12 right-12" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Top Pill Badge */}
        <div className="px-5 py-2 flex justify-center items-center bg-[#EFE7F6] text-[#5A10A5] border border-[#CCB5E3]/80 rounded-full text-xs font-semibold tracking-wide shadow-sm">
          Empowering Tech & Innovation
        </div>

        {/* Section Heading */}
        <h2 className="font-extrabold text-4xl md:text-5xl lg:text-[50px] text-[#000640] text-center leading-tight">
          Our <span className="text-[#5A10A5]">Sponsors & Partners</span>
        </h2>

      
        {/* Sponsors Display Grid / Swiper */}
        <div className="w-full pt-6">
          <SponsorsSection />
        </div>
      </div>
    </section>
  );
};

export default Sponsers;
