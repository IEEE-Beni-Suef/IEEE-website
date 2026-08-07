import React from "react";
import { List, LayoutGrid, Calendar, Search, RotateCcw, ChevronDown } from "lucide-react";

export type TaskViewMode = "list" | "kanban" | "calendar";

export interface TaskFilterState {
  search: string;
  committee: string;
  priority: string;
  status: string;
}

interface TaskFiltersProps {
  viewMode: TaskViewMode;
  onViewModeChange: (mode: TaskViewMode) => void;
  filters: TaskFilterState;
  onFilterChange: (key: keyof TaskFilterState, value: string) => void;
  onReset: () => void;
  totalCount: number;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  viewMode,
  onViewModeChange,
  filters,
  onFilterChange,
  onReset,
  totalCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Strip: View Mode Toggle + Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* View Mode Buttons */}
        <div className="inline-flex items-center p-1 bg-gray-100/80 rounded-xl border border-gray-200/60 shrink-0">
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
              viewMode === "list"
                ? "bg-[#5A10A5] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <List className="w-3.5 h-3.5" /> List View
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("kanban")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
              viewMode === "kanban"
                ? "bg-[#5A10A5] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Kanban View
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("calendar")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
              viewMode === "calendar"
                ? "bg-[#5A10A5] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Calendar View
          </button>
        </div>

        <span className="text-xs font-semibold text-gray-400">
          Showing 1-{totalCount} of 54 tasks
        </span>
      </div>

      {/* Filter inputs bar */}
      <div className="w-full bg-white border border-purple-100/80 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks or assignees..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-xs font-semibold text-gray-900 placeholder-gray-400 outline-none focus:border-[#5A10A5] focus:bg-white transition-all"
          />
        </div>

        {/* Dropdowns & Reset button */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          {/* Committee Select */}
          <div className="relative min-w-[130px]">
            <select
              value={filters.committee}
              onChange={(e) => onFilterChange("committee", e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
            >
              <option value="">All Committees</option>
              <option value="Web Team">Web Team</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="PR Team">PR Team</option>
              <option value="Robotics">Robotics</option>
              <option value="HR">HR</option>
              <option value="CS">CS</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Priority Select */}
          <div className="relative min-w-[110px]">
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange("priority", e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
            >
              <option value="">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low Priority</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Status Select */}
          <div className="relative min-w-[110px]">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
            >
              <option value="">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Reset Button */}
          {(filters.search || filters.committee || filters.priority || filters.status) && (
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
    </div>
  );
};

export default TaskFilters;
