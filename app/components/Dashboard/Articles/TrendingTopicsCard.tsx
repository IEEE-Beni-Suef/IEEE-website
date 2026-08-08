import React from "react";
import { TrendingUp } from "lucide-react";

interface TrendingTopicsProps {
  onSelectTag?: (tag: string) => void;
  selectedTag?: string;
}

export function TrendingTopicsCard({ onSelectTag, selectedTag }: TrendingTopicsProps) {
  const topics = [
    "Artificial Intelligence",
    "Circuit Design",
    "5G Networks",
    "Quantum Computing",
    "Robotics",
    "Machine Learning",
    "PCB Design",
    "Cybersecurity",
  ];

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#5A10A5]" />
        <h3 className="font-extrabold text-sm text-gray-900">
          Trending Topics
        </h3>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {topics.map((topic) => {
          const isSelected = selectedTag?.toLowerCase() === topic.toLowerCase();
          return (
            <button
              key={topic}
              type="button"
              onClick={() => onSelectTag?.(topic)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#5A10A5] border-[#5A10A5] text-white shadow-xs"
                  : "bg-purple-50/70 border-purple-100 text-purple-700 hover:bg-purple-100"
              }`}
            >
              #{topic}
            </button>
          );
        })}
      </div>
    </div>
  );
}

