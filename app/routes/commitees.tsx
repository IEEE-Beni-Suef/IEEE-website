import React from "react";
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";
import { Users } from "lucide-react";
import { Section } from "../components/ui/Section";
import CommitteesSection from "~/components/Committees/CommitteeSection";

const StarSparkle = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`absolute pointer-events-none text-[#CCB5E3] opacity-70 animate-pulse ${className}`}
  >
    <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
  </svg>
);

const Commitees = () => {
  const { data: committees, isLoading, isError, error } = useCommittees();

  return (
    <section
      className="relative bg-gradient-to-b from-slate-50/80 via-purple-50/20 to-slate-50/80 py-20 w-full px-4 md:px-10 overflow-hidden font-sans"
      id="committees"
    >
      {/* Decorative 4-Point Star Sparkles matching design */}
      <StarSparkle className="w-8 h-8 top-10 left-12" />
      <StarSparkle className="w-6 h-6 top-32 left-1/5" />
      <StarSparkle className="w-7 h-7 top-16 right-16" />
      <StarSparkle className="w-6 h-6 top-48 right-1/4" />
      <StarSparkle className="w-5 h-5 bottom-12 left-8" />
      <StarSparkle className="w-7 h-7 bottom-20 right-12" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Top Badge */}
        <div className="px-5 py-2 flex justify-center items-center bg-[#EFE7F6] text-[#5A10A5] border border-[#CCB5E3]/80 rounded-full text-xs font-semibold tracking-wide shadow-sm">
          The Heart Of IEEE
        </div>

        {/* Section Heading */}
        <h2 className="font-extrabold text-4xl md:text-5xl lg:text-[50px] text-[#000640] text-center leading-tight">
          Explore Our <span className="text-[#5A10A5]">Committees</span>
        </h2>

        {/* Section Subtitle */}
        <p className="max-w-2xl font-medium text-sm md:text-base text-[#4460EF] text-center leading-relaxed">
          Join a specialized community where students push the boundaries of
          technology and leadership. Choose your path and start building the
          future today.
        </p>

        {/* Committees Toggle & Swiper Section */}
        <div className="w-full pt-4">
          <CommitteesSection
            error={error}
            isLoading={isLoading}
            isError={isError}
            committees={committees || []}
          />
        </div>
      </div>
    </section>
  );
};

export default Commitees;
