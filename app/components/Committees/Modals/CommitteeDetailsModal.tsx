import React from "react";
import { X, Calendar, MapPin, Mail, Phone, Users, CheckSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { CommitteeData } from "../DashboardCommitteeCard";

interface CommitteeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  committee: CommitteeData | null;
  onViewMembers: (committee: CommitteeData) => void;
}

export const CommitteeDetailsModal: React.FC<CommitteeDetailsModalProps> = ({
  isOpen,
  onClose,
  committee,
  onViewMembers,
}) => {
  const { isDark } = useTheme();

  if (!isOpen || !committee) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const headName = committee.headName || "Omar Khalil";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-2xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">Committee Details</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Header Box */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                🌐
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base">{committee.name}</h3>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {committee.status || "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                About
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {committee.description ||
                  "Responsible for building and maintaining all IEEE SB web platforms, including the main website, member portal, and digital tools."}
              </p>
            </div>

            {/* Details List */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#161F33]">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">Founded</span>
                  <span className="font-bold">{committee.foundedDate || "March 2019"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#161F33]">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">Location</span>
                  <span className="font-bold">{committee.location || "Faculty of Engineering, Lab 3"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#161F33]">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">Head Email</span>
                  <span className="font-bold">{committee.headEmail || "omar@ieee-sb.org"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-[#161F33]">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">Head Phone</span>
                  <span className="font-bold">{committee.headPhone || "+20 100 123 4567"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Health Score Box */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#161F33] text-center border border-gray-100 dark:border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Health Score
              </span>
              <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center mx-auto my-1">
                <span className="font-extrabold text-lg text-blue-600 dark:text-blue-400">
                  {committee.healthScore ?? 92}%
                </span>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {committee.healthStatus || "Excellent"}
              </span>
            </div>

            {/* Mini Stats 3 boxes */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200">
                <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <span className="font-extrabold block text-sm">{committee.memberCount ?? 42}</span>
                <span className="text-[10px] text-gray-500">Members</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200">
                <CheckSquare className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                <span className="font-extrabold block text-sm">{committee.tasksCount ?? 24}</span>
                <span className="text-[10px] text-gray-500">Tasks</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200">
                <Calendar className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                <span className="font-extrabold block text-sm">{committee.meetingsCount ?? 8}</span>
                <span className="text-[10px] text-gray-500">Meetings</span>
              </div>
            </div>

            {/* Recruitment Status Bar */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Recruitment Status</span>
              <span className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {committee.recruitmentStatus || "Open"}
              </span>
            </div>

            {/* Head Card */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Committee Head
              </span>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#161F33] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {getInitials(headName)}
                </div>
                <div>
                  <h4 className="font-bold text-xs">{headName}</h4>
                  <p className="text-[10px] text-gray-400">Committee Head</p>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => {
                onClose();
                onViewMembers(committee);
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Users className="w-4 h-4" />
              View All Members
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeDetailsModal;
