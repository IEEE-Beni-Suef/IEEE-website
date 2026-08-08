import React from "react";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface CommitteesFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedHead: string;
  onHeadChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
  headOptions?: string[];
}

export const CommitteesFilterBar: React.FC<CommitteesFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedHead,
  onHeadChange,
  selectedStatus,
  onStatusChange,
  onReset,
  headOptions = ["All Heads", "Omar Khalil", "Sara Ahmed", "Mohamed Sherif"],
}) => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border flex-1 min-w-[220px] transition-colors ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-[#F8FAFC] border-[#EEF0FF] text-[#000640]"
        }`}
      >
        <Search
          className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-[#98A2B3]"}`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search committees..."
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#98A2B3] dark:placeholder:text-gray-500"
        />
      </div>

      {/* Committee Head Filter */}
      <div className="relative">
        <select
          value={selectedHead}
          onChange={(e) => onHeadChange(e.target.value)}
          className={`appearance-none px-4 py-2.5 pr-9 rounded-xl border text-sm font-medium outline-none cursor-pointer transition-colors ${
            isDark
              ? "bg-[#101726] border-[#232D42] text-gray-200"
              : "bg-[#F8FAFC] border-[#EEF0FF] text-[#344054]"
          }`}
        >
          <option value="All Heads">Committee Head</option>
          {headOptions.map((head, idx) => (
            <option key={idx} value={head}>
              {head}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
            isDark ? "text-gray-400" : "text-[#667085]"
          }`}
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`appearance-none px-4 py-2.5 pr-9 rounded-xl border text-sm font-medium outline-none cursor-pointer transition-colors ${
            isDark
              ? "bg-[#101726] border-[#232D42] text-gray-200"
              : "bg-[#F8FAFC] border-[#EEF0FF] text-[#344054]"
          }`}
        >
          <option value="All Statuses">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <ChevronDown
          className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
            isDark ? "text-gray-400" : "text-[#667085]"
          }`}
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-gray-300 hover:bg-[#182033]"
            : "bg-white border-[#EEF0FF] text-[#344054] hover:bg-gray-50"
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
        Reset
      </button>
    </div>
  );
};

export default CommitteesFilterBar;
