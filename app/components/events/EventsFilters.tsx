import React from "react";
import { Search, RotateCcw, ListFilter, LayoutGrid, CalendarDays } from "lucide-react";

export interface FilterState {
  search: string;
  category: string;
  committee: string;
  status: string;
  month: string;
  location: string;
  sortBy: string;
}

interface EventsFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  categories?: Array<{ id: string; name: string }>;
  viewMode: "list" | "kanban" | "calendar";
  onViewModeChange: (mode: "list" | "kanban" | "calendar") => void;
  totalCount?: number;
}

export const EventsFilters: React.FC<EventsFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  categories = [],
  viewMode,
  onViewModeChange,
  totalCount = 0,
}) => {
  return (
    <div className="space-y-4">
      {/* Filter Row 1: Search & Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white p-3 rounded-2xl border border-purple-100/70 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Committee Dropdown */}
        <select
          value={filters.committee}
          onChange={(e) => onFilterChange("committee", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">Committees</option>
          <option value="CS">Computer Society (CS)</option>
          <option value="RAS">RAS</option>
          <option value="WIE">WIE</option>
          <option value="PES">PES</option>
          <option value="General">General</option>
        </select>

        {/* Status Dropdown */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">All Statuses</option>
          <option value="Registration Open">Registration Open</option>
          <option value="Coming Soon">Coming Soon</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Month Dropdown */}
        <select
          value={filters.month}
          onChange={(e) => onFilterChange("month", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">Month</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
        </select>

        {/* Location Dropdown */}
        <select
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">Location</option>
          <option value="Faculty of Computers">Faculty of Computers</option>
          <option value="Main Hall">Main Hall</option>
          <option value="Lab 201">Lab 201</option>
        </select>

        {/* Sort By Dropdown */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all"
        >
          <option value="">Sort by</option>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
          <option value="name-asc">Name A-Z</option>
          <option value="registered">Registered</option>
        </select>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Filter Row 2: View Toggle Tabs & Total Count */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-purple-50/50 border border-purple-100/70">
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-[#5A10A5] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" /> List View
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "kanban"
                ? "bg-[#5A10A5] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Kanban View
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "calendar"
                ? "bg-[#5A10A5] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" /> Calendar View
          </button>
        </div>

        <span className="text-xs font-semibold text-gray-500 hidden sm:block">
          Showing <span className="font-bold text-gray-900">{totalCount}</span> of 7 events
        </span>
      </div>
    </div>
  );
};

export default EventsFilters;
