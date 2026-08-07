import React from "react";
import { Trophy } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface RankedCategory {
  rank: number;
  name: string;
  count: number;
  color: string; // bar color
}

interface MostUsedCategoriesCardProps {
  categories?: RankedCategory[];
}

export const MostUsedCategoriesCard: React.FC<MostUsedCategoriesCardProps> = ({
  categories,
}) => {
  const { isDark } = useTheme();

  const defaultList: RankedCategory[] = [
    { rank: 1, name: "Workshop", count: 12, color: "bg-[#5A10A5]" },
    { rank: 2, name: "Bootcamp", count: 10, color: "bg-teal-500" },
    { rank: 3, name: "Competition", count: 6, color: "bg-blue-600" },
  ];

  const list = categories || defaultList;
  const maxCount = Math.max(...list.map((c) => c.count), 1);

  return (
    <div
      className={`rounded-2xl p-5 border transition-colors shadow-xs ${
        isDark
          ? "bg-[#101726] border-[#232D42] text-white"
          : "bg-white border-purple-100 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h3 className="font-bold text-base tracking-tight">Most Used Categories</h3>
      </div>

      <div className="space-y-4">
        {list.map((item) => {
          const percentage = Math.round((item.count / maxCount) * 100);

          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px] flex items-center justify-center">
                    {item.rank}
                  </span>
                  <span className={isDark ? "text-gray-200" : "text-gray-800"}>
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-400 font-medium">{item.count} events</span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#182033] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostUsedCategoriesCard;
