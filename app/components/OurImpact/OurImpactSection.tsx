import React from "react";
import OurImpactTitle from "./OurImpactTitle";
import ImpactPipeline from "./ImpactPipeline";
import ImpactStatsRow from "./ImpactStatsRow";
import ImpactQuoteCard from "./ImpactQuoteCard";

export const OurImpactSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Title & Subtitle Component */}
        <OurImpactTitle />

        {/* 5-Step Pipeline Flow Diagram */}
        <ImpactPipeline />

        {/* 6 Metric Stat Cards Row */}
        <ImpactStatsRow />

        {/* Bottom Mission Quote Banner Card */}
        <ImpactQuoteCard />
      </div>
    </section>
  );
};

// Also export alias matching the name requested in prompt
export const OurImpact = OurImpactSection;

export default OurImpactSection;
