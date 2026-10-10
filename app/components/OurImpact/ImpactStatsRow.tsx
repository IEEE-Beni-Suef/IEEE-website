import React from "react";
import ImpactStatCard from "./ImpactStatCard";
import { Calendar, Users, Wrench } from "lucide-react";

export const ImpactStatsRow: React.FC = () => {
  const stats = [
    {
      id: 1,
      icon: <Calendar className="w-4 h-4 text-[#5A10A5]" />,
      value: "+10",
      label: "Events Organized",
    },
    {
      id: 2,
      icon: <Users className="w-4 h-4 text-[#5A10A5]" />,
      value: "+20",
      label: "Participants",
    },
    {
      id: 3,
      icon: <Wrench className="w-4 h-4 text-[#5A10A5]" />,
      value: "+30",
      label: "Workshops Delivered",
    },
    {
      id: 4,
      icon: <Users className="w-4 h-4 text-[#5A10A5]" />,
      value: "+20",
      label: "Ambassadors",
    },
    {
      id: 5,
      icon: <Users className="w-4 h-4 text-[#5A10A5]" />,
      value: "+20",
      label: "Projects & Initiatives",
    },
    {
      id: 6,
      icon: <Users className="w-4 h-4 text-[#5A10A5]" />,
      value: "—",
      label: "Collaborations",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 w-full mb-10">
      {stats.map((stat) => (
        <ImpactStatCard
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default ImpactStatsRow;
