import React from "react";
import WhoWeAreTitle from "./WhoWeAreTitle";
import WhoWeAreContent from "./WhoWeAreContent";
import WhoWeAreStats from "./WhoWeAreStats";

export const WhoWeAreSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Title Component (WHO WE ARE, More Than a, Student Branch.) */}
        <WhoWeAreTitle />

        {/* Content Component (Paragraphs, Tags & Image Block with Region 8) */}
        <WhoWeAreContent />

        {/* Stats Component (4 Stat Cards with bottom gradient lines) */}
        <WhoWeAreStats />
      </div>
    </section>
  );
};

// Also export alias matching the spelling requested in prompt
export const WhoWeAreSecion = WhoWeAreSection;

export default WhoWeAreSection;
