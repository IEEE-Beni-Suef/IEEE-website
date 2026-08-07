import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface NewestCategoryCardProps {
  name?: string;
  createdDate?: string;
  onExplore?: () => void;
}

export const NewestCategoryCard: React.FC<NewestCategoryCardProps> = ({
  name = "Cybersecurity CTF",
  createdDate = "Jan 28, 2026",
  onExplore,
}) => {
  return (
    <div className="rounded-2xl p-6 bg-[#5A10A5] text-white shadow-lg shadow-purple-500/20 relative overflow-hidden flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 border border-white/30 text-purple-100">
          <Sparkles className="w-3.5 h-3.5" />
          Newest Category
        </span>
        <span className="text-[11px] text-purple-200">{createdDate}</span>
      </div>

      <div>
        <h3 className="text-xl font-extrabold tracking-tight">{name}</h3>
        <p className="text-xs text-purple-200 mt-1">
          Recently created category ready for assignation to new IEEE BNS events.
        </p>
      </div>

      {onExplore && (
        <button
          type="button"
          onClick={onExplore}
          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-[#5A10A5] font-bold text-xs hover:bg-purple-50 transition-colors cursor-pointer"
        >
          Explore Category <ArrowUpRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default NewestCategoryCard;
