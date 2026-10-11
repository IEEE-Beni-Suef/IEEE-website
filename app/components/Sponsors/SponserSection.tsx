import React from "react";
import SponsorCard from "./SponsorCard";

import hashtagImg from "~/assets/images/Sponsors/Hashtag.png";
import sarapopsImg from "~/assets/images/Sponsors/Sarapops.png";
import techineImg from "~/assets/images/Sponsors/Techine.png";

export const staticSponsors = [
  {
    id: 1,
    title: "Hashtag Workspace",
    name: "Hashtag Workspace",
    img: hashtagImg,
    description: "Co-working space and community partner supporting tech events and innovation.",
  },
  {
    id: 2,
    title: "sara pops",
    name: "sara pops",
    img: sarapopsImg,
    description: "Official sponsor supporting student activities and branch initiatives.",
  },
  {
    id: 3,
    title: "techine",
    name: "techine",
    img: techineImg,
    description: "Technology partner supporting technical development and workshops.",
  },
];

const SponsorsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 justify-items-center max-w-5xl mx-auto">
      {staticSponsors.map((sponsor) => (
        <SponsorCard
          key={sponsor.id}
          id={sponsor.id}
          description={sponsor.description}
          img={sponsor.img}
          title={sponsor.title}
        />
      ))}
    </div>
  );
};

export default SponsorsSection;
