import React, { useState } from "react";
import { Users, Check, Search, X, ChevronDown } from "lucide-react";

interface EmailRecipientsCardProps {
  selectedCount?: number;
  onSelectionChange?: (selectedGroups: string[], filters: any) => void;
}

export const EmailRecipientsCard: React.FC<EmailRecipientsCardProps> = ({
  selectedCount = 127,
  onSelectionChange,
}) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([
    "All Members",
    "Frontend Committee",
    "HR Committee",
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Web Committee",
    "UI/UX",
    "HR",
  ]);

  const [filters, setFilters] = useState({
    committee: "",
    academicYear: "",
    role: "",
    status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const recipientGroups = [
    { id: "all", label: "All Members" },
    { id: "highboard", label: "High Board" },
    { id: "heads", label: "Committee Heads" },
    { id: "frontend", label: "Frontend Committee" },
    { id: "hr", label: "HR Committee" },
    { id: "pr", label: "PR Committee" },
    { id: "backend", label: "Backend Committee" },
    { id: "ai", label: "AI Committee" },
  ];

  const toggleGroup = (label: string) => {
    let updated: string[];
    if (selectedGroups.includes(label)) {
      updated = selectedGroups.filter((g) => g !== label);
    } else {
      updated = [...selectedGroups, label];
    }
    setSelectedGroups(updated);
    if (onSelectionChange) onSelectionChange(updated, filters);
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#000640]">Recipients</h2>
          <p className="text-xs text-[#6C757D]">Choose who will receive this email.</p>
        </div>

        <div className="bg-purple-100/70 border border-purple-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-[#5A10A5] font-bold shadow-2xs">
          <Users className="w-3.5 h-3.5" />
          <span>{selectedCount} Selected</span>
        </div>
      </div>

      {/* Recipient Groups Pills */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          RECIPIENT GROUPS
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {recipientGroups.map((grp) => {
            const isSelected = selectedGroups.includes(grp.label);
            return (
              <button
                key={grp.id}
                type="button"
                onClick={() => toggleGroup(grp.label)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#5A10A5] text-white border-[#5A10A5] shadow-xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{grp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters Dropdowns Row */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          ADVANCED FILTERS
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <select
              value={filters.committee}
              onChange={(e) => setFilters({ ...filters, committee: e.target.value })}
              className="w-full p-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-[#000640] appearance-none outline-none focus:ring-2 focus:ring-[#5A10A5] cursor-pointer"
            >
              <option value="">Committee</option>
              <option value="web">Web Committee</option>
              <option value="uiux">UI/UX Committee</option>
              <option value="hr">HR Committee</option>
              <option value="pr">PR Committee</option>
              <option value="cs">CS Committee</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filters.academicYear}
              onChange={(e) => setFilters({ ...filters, academicYear: e.target.value })}
              className="w-full p-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-[#000640] appearance-none outline-none focus:ring-2 focus:ring-[#5A10A5] cursor-pointer"
            >
              <option value="">Academic Year</option>
              <option value="first">First Year</option>
              <option value="second">Second Year</option>
              <option value="third">Third Year</option>
              <option value="fourth">Fourth Year</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="w-full p-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-[#000640] appearance-none outline-none focus:ring-2 focus:ring-[#5A10A5] cursor-pointer"
            >
              <option value="">Role</option>
              <option value="highboard">High Board</option>
              <option value="head">Committee Head</option>
              <option value="member">Member</option>
              <option value="hr">HR</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-3 pr-8 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-[#000640] appearance-none outline-none focus:ring-2 focus:ring-[#5A10A5] cursor-pointer"
            >
              <option value="">Account Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Search Members Input */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          SEARCH MEMBERS
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#000640] outline-none focus:ring-2 focus:ring-[#5A10A5] transition-all"
          />
        </div>
      </div>

      {/* Selected Tags */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
          SELECTED
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-[#4460EF]"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          <span className="px-3 py-1.5 bg-gray-100 rounded-xl text-xs font-semibold text-gray-500">
            +{selectedCount - selectedTags.length * 4 > 0 ? selectedCount - 3 : 124} Members
          </span>
        </div>
      </div>
    </div>
  );
};
