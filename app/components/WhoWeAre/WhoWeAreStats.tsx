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
  { id: 1, number: "+200", label: "Members" },
  { id: 2, number: "+2", label: "Events" },
  { id: 3, number: "4", label: "Chapters and Affinity Groups" },
  { id: 4, number: "+10", label: "Projects" },
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
