import React, { type ReactNode } from "react";

interface IProps {
  isDark: boolean;
  Icon: ReactNode;
  text: string;
  number: number;
  iconBackground: string;
  subText: string;
}

const MeetingStatsCard = ({
  Icon,
  iconBackground,
  isDark,
  number,
  subText,
  text,
}: IProps) => {
  return (
    <div
      className={`flex flex-col space-y-2.5 p-5 rounded-2xl border transition-all ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-[#EEF0FF] text-[#000640] shadow-xs"
      }`}
    >
      <div
        style={{
          background: iconBackground,
        }}
        className="w-10 h-10 rounded-xl  text-[#5A10A5] dark:text-[#A78BFA] flex items-center justify-center"
      >
        {Icon}
      </div>
      <div
        className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        {text}
      </div>
      <div className="text-3xl font-extrabold mb-1">{number}</div>
      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {subText}
      </div>
    </div>
  );
};

export default MeetingStatsCard;
