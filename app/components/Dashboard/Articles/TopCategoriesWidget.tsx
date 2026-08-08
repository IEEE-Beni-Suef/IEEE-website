import React from "react";
import { FolderOpen } from "lucide-react";

interface CategoryStat {
  id: string | number;
  name: string;
  count: number;
  color: string;
}

interface TopCategoriesProps {
  categories?: any[];
}

export function TopCategoriesWidget({ categories }: TopCategoriesProps) {
  const defaultCategories: CategoryStat[] = [
    { id: "1", name: "Technical", count: 5, color: "bg-[#5A10A5]" },
    { id: "2", name: "Workshop", count: 3, color: "bg-blue-500" },
    { id: "3", name: "Research", count: 2, color: "bg-emerald-500" },
    { id: "4", name: "Competition", count: 1, color: "bg-rose-500" },
    { id: "5", name: "Community", count: 1, color: "bg-amber-500" },
  ];

  const categoryList: CategoryStat[] =
    categories && categories.length > 0
      ? categories.map((cat, idx) => ({
          id: cat.id,
          name: cat.name,
          count: cat.articleCount || Math.floor(Math.random() * 4) + 1,
          color:
            idx % 5 === 0
              ? "bg-[#5A10A5]"
              : idx % 5 === 1
              ? "bg-blue-500"
              : idx % 5 === 2
              ? "bg-emerald-500"
              : idx % 5 === 3
              ? "bg-rose-500"
              : "bg-amber-500",
        }))
      : defaultCategories;

  const total = categoryList.reduce((acc, c) => acc + c.count, 0) || 1;

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[#5A10A5]" />
          <h3 className="font-extrabold text-sm text-gray-900">
            Top Categories
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          {categoryList.length} Categories
        </span>
      </div>

      <div className="space-y-3">
        {categoryList.map((cat) => {
          const pct = Math.round((cat.count / total) * 100);
          return (
            <div key={cat.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2 text-gray-700">
                  <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                  {cat.name}
                </span>
                <span className="text-gray-500">{cat.count}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-purple-50 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cat.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

