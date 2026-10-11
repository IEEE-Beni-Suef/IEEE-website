import React from "react";
import { Users } from "lucide-react";
import WebsiteTeamCard, { type WebsiteTeamMember } from "./WebsiteTeamCard";

import elshishtawyImg from "~/assets/images/WebsiteTeam/Elshishtawy.jpeg";
import youssefImg from "~/assets/images/WebsiteTeam/YoussefAlaa.jpg";
import ahmedElBannaImg from "~/assets/images/WebsiteTeam/Ahmed El-Banna.png";
import mariemImg from "~/assets/images/WebsiteTeam/Mariem Gamal.png";
import placeholderImg from "~/assets/images/highBoard/webmaster.png";

const teamMembers: WebsiteTeamMember[] = [
  {
    id: "member-1",
    name: "Mohammed Elshishtawy",
    roleTag: "Web Master",
    description:
      "Overseeing the website's development and ensuring a seamless digital experience.",
    image: elshishtawyImg,
  },
  {
    id: "member-2",
    name: "Mostafa Hatem",
    roleTag: "Front-End Developer",
    description:
      "Bringing designs to life through responsive, interactive, and user-friendly interfaces.",
    image: placeholderImg,
  },
  {
    id: "member-3",
    name: "Youssef Alaa",
    roleTag: "Front-End Developer",
    description:
      "Bringing designs to life through responsive, interactive, and user-friendly interfaces.",
    image: youssefImg,
  },
  {
    id: "member-4",
    name: "Ahmed El-Banna",
    roleTag: "Back-End Developer",
    description:
      "Building the functionality behind the scenes to ensure reliable performance and smooth data management.",
    image: ahmedElBannaImg,
  },
  {
    id: "member-5",
    name: "Mariam Gamal",
    roleTag: "UI/UX Designer",
    description:
      "Crafting intuitive user experiences and visually engaging designs that put users first.",
    image: mariemImg,
  },
  {
    id: "member-6",
    name: "Ahmed Abdelkereem",
    roleTag: "UI/UX Designer",
    description:
      "Crafting intuitive user experiences and visually engaging designs that put users first.",
    image: placeholderImg,
  },
];

export const WebsiteTeamSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1060px] mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
          {/* Category Tag */}
          <div className="flex flex-col items-center gap-1.5">
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
              WEBSITE TEAM S10
            </span>
            <div className="w-6 h-[2px] bg-[#5A10A5] rounded-full" />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center">
            <span style={{ color: "#000640" }}>Website Team </span>
            <span style={{ color: "#5A10A5" }}>S10</span>
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-2xl text-center text-sm sm:text-base"
            style={{
              fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              color: "#4460EF",
              lineHeight: "1.6",
              fontWeight: 500,
            }}
          >
            Every interaction you see here was designed and built by students from our branch.
          </p>
        </div>

        {/* 100% Student-Built Badge Container */}
        <div className="bg-[#5A10A5]/5 border border-[#5A10A5]/20 rounded-2xl px-6 py-3.5 flex items-center gap-3.5 shadow-sm mb-12">
          <div className="w-9 h-9 rounded-xl bg-[#5A10A5] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span
              className="text-xs font-black text-[#000640]"
              style={{
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              }}
            >
              100% Student-Built
            </span>
            <span
              className="text-[11px] text-[#5A6A8A] font-medium"
              style={{
                fontFamily: "Font/Font Family/Font Family#01, Montserrat, sans-serif",
              }}
            >
              Designed, developed & delivered by IEEE BSU members
            </span>
          </div>
        </div>

        {/* ── Team Cards Grid (Matching max-w-[1060px] & 3 Cols) ── */}
        <div className="w-full max-w-[1060px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <WebsiteTeamCard
              key={member.id}
              id={member.id}
              name={member.name}
              roleTag={member.roleTag}
              description={member.description}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteTeamSection;
