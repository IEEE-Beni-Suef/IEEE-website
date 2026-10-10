import React from "react";
import OurCommunityTitle from "./OurCommunityTitle";
import OurCommunityGrid from "./OurCommunityGrid";

export const OurCommunitySection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Title & Subtitle Component */}
        <OurCommunityTitle />

        {/* 4 Community Cards Grid Component */}
        <OurCommunityGrid />
      </div>
    </section>
  );
};

// Also export alias matching the name requested in prompt
export const OurCommunity = OurCommunitySection;

export default OurCommunitySection;
