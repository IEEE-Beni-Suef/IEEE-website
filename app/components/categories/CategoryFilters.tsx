import React from "react";
import { Search, RotateCcw, Filter, ChevronDown } from "lucide-react";

export interface CategoryFilterState {
  search: string;
  status: string;
  sortBy: string;
}

interface CategoryFiltersProps {
  filters: CategoryFilterState;
  onFilterChange: (key: keyof CategoryFilterState, value: string) => void;
  onReset: () => void;
  totalCount?: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalCount = 0,
}) => {
  return (
    <div className="w-full bg-white border border-purple-100/80 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 w-full sm:w-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search Categories..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-xs font-semibold text-gray-900 placeholder-gray-400 outline-none focus:border-[#5A10A5] focus:bg-white transition-all"
        />
      </div>

      {/* Dropdowns & Reset button */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        {/* Status Dropdown */}
        <div className="relative min-w-[120px]">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Hidden">Hidden</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative min-w-[110px]">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
            className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="events">Most Events</option>
            <option value="newest">Newest</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Reset Button */}
        {(filters.search || filters.status || filters.sortBy) && (
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-purple-50 text-xs font-bold text-purple-700 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
