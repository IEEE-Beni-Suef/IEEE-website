import React from "react";
import StatCard from "./StatCard";

export interface StatItem {
  id?: string | number;
  number: string;
  label: string;
}

export interface WhoWeAreStatsProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { id: 1, number: "+300", label: "Members" },
  { id: 2, number: "+10", label: "Events" },
  { id: 3, number: "+3", label: "Chapters & Affinity Groups" },
  { id: 4, number: "+20", label: "Projects & Initiatives" },
];

export const WhoWeAreStats: React.FC<WhoWeAreStatsProps> = ({
  stats = defaultStats,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, idx) => (
        <StatCard
          key={stat.id || idx}
          number={stat.number}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default WhoWeAreStats;
