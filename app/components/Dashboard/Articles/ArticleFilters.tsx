import React from "react";
import { Search, Filter, LayoutGrid, List, Table, RotateCcw, RefreshCw } from "lucide-react";
import type { Category } from "~/types/index";

export type ArticleViewMode = "grid" | "list" | "table";

export interface FilterState {
  search: string;
  category: string;
  generation: string;
  tag: string;
  status: string;
}

interface ArticleFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  categories?: Category[];
  categoriesLoading?: boolean;
  viewMode: ArticleViewMode;
  onViewModeChange: (mode: ArticleViewMode) => void;
  totalCount?: number;
}

export function ArticleFilters({
  filters,
  onFilterChange,
  onReset,
  categories = [],
  categoriesLoading = false,
  viewMode,
  onViewModeChange,
  totalCount = 0,
}: ArticleFiltersProps) {
  const quickTags = ["AI & ML", "Cybersecurity", "Web Dev", "Robotics"];

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-4 sm:p-5 shadow-2xs mb-6 space-y-4">
      {/* Top Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-gray-200 bg-gray-50/80 text-gray-900 placeholder-gray-400 font-medium outline-none focus:border-[#5A10A5] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdown 1: Article Type */}
        <div className="relative w-full sm:w-36">
          <select
            value={filters.generation}
            onChange={(e) => onFilterChange("generation", e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs border border-gray-200 bg-gray-50/80 text-gray-900 font-medium outline-none appearance-none cursor-pointer focus:border-[#5A10A5] focus:bg-white transition-all"
          >
            <option value="">Select Article Type</option>
            <option value="technical">Technical</option>
            <option value="news">News & Blogs</option>
            <option value="workshop">Workshop Summaries</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Dropdown 2: Category */}
        <div className="relative w-full sm:w-36">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            disabled={categoriesLoading}
            className="w-full px-3 py-2 rounded-xl text-xs border border-gray-200 bg-gray-50/80 text-gray-900 font-medium outline-none appearance-none cursor-pointer focus:border-[#5A10A5] focus:bg-white transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Dropdown 3: Committee */}
        <div className="relative w-full sm:w-36">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs border border-gray-200 bg-gray-50/80 text-gray-900 font-medium outline-none appearance-none cursor-pointer focus:border-[#5A10A5] focus:bg-white transition-all"
          >
            <option value="">All Committees</option>
            <option value="CS">Computer Society</option>
            <option value="RAS">Robotics & Automation</option>
            <option value="PES">Power & Energy</option>
            <option value="WIE">Women in Engineering</option>
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Reset Button */}
        {(filters.search || filters.category || filters.generation || filters.tag || filters.status) && (
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        )}

        {/* Refresh & View Modes */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onReset}
            title="Refresh"
            className="p-2 rounded-xl border border-gray-200 bg-gray-50/80 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="flex items-center p-1 rounded-xl border border-gray-200 bg-gray-100/80">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#5A10A5] text-white shadow-xs"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              title="List View"
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#5A10A5] text-white shadow-xs"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              title="Table View"
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#5A10A5] text-white shadow-xs"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tag Chips & Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-50">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Popular Tags:
          </span>
          {quickTags.map((t) => {
            const isSelected = filters.tag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onFilterChange("tag", isSelected ? "" : t)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#5A10A5] border-[#5A10A5] text-white"
                    : "bg-purple-50/50 border-purple-100 text-purple-700 hover:bg-purple-100"
                }`}
              >
                • {t}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-medium text-gray-400">
          Showing <strong className="text-gray-900">{totalCount}</strong> articles
        </span>
      </div>
    </div>
  );
}

