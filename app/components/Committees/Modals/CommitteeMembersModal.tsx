import React, { useState } from "react";
import { X, Search } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { CommitteeData } from "../DashboardCommitteeCard";

interface CommitteeMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  committee: CommitteeData | null;
}

export const CommitteeMembersModal: React.FC<CommitteeMembersModalProps> = ({
  isOpen,
  onClose,
  committee,
}) => {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  if (!isOpen || !committee) return null;

  const mockMembers = [
    { name: "Omar Khalil", role: "Committee Head", status: "Active", joined: "Joined Mar 2019", initials: "OK", color: "bg-blue-600" },
    { name: "Ali Hassan", role: "Frontend Dev", status: "Active", joined: "Joined Sep 2021", initials: "AH", color: "bg-indigo-600" },
    { name: "Dina Mostafa", role: "Backend Dev", status: "Active", joined: "Joined Jan 2022", initials: "DM", color: "bg-purple-600" },
    { name: "Youssef Adel", role: "DevOps", status: "Active", joined: "Joined Mar 2022", initials: "YA", color: "bg-[#2563EB]" },
    { name: "Salma Nabil", role: "Frontend Dev", status: "Active", joined: "Joined Oct 2022", initials: "SN", color: "bg-pink-600" },
    { name: "Khaled Samy", role: "Full Stack", status: "Active", joined: "Joined Feb 2023", initials: "KS", color: "bg-cyan-600" },
  ];

  const filtered = mockMembers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-extrabold">
            {committee.name} — <span className="text-gray-500 font-normal">Members ({committee.memberCount ?? 42})</span>
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none transition-colors ${
              isDark
                ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-500"
                : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
            }`}
          />
        </div>

        {/* Members List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.map((member, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
                isDark ? "bg-[#161F33] border-[#232D42]" : "bg-gray-50/70 border-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${member.color} text-white font-extrabold text-xs flex items-center justify-center`}>
                  {member.initials}
                </div>
                <div>
                  <h4 className="font-bold text-xs">{member.name}</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {member.status}
                </span>
                <p className="text-[10px] text-gray-400 mt-0.5">{member.joined}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t text-center text-[11px] text-gray-400 dark:border-gray-800">
          Showing {filtered.length} of {committee.memberCount ?? 42} members - Full list available in the member portal
        </div>
      </div>
    </div>
  );
};

export default CommitteeMembersModal;
