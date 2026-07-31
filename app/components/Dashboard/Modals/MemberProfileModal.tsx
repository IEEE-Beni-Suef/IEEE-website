import React from "react";
import { X, Mail, Phone, Building, Shield, GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import type { DashboardMember } from "~/types/dashboard";

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: DashboardMember | null;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  if (!isOpen || !member) return null;

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">Member Profile</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="mt-5 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 mb-3">
            {getInitials(member.name)}
          </div>
          <h4 className="text-xl font-bold text-[#000640] dark:text-white">{member.name}</h4>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950/50 text-[#4F46E5] dark:text-indigo-400 text-xs font-bold rounded-full mt-1">
            {member.role} • {member.committee}
          </span>
        </div>

        {/* Member Info List */}
        <div className="mt-6 space-y-3 bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">{member.email}</span>
          </div>

          {member.phone && (
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="font-semibold">{member.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">{member.academicYear}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Building className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">{member.committee} Committee</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">Joined: {member.joinedDate}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="font-semibold">Status: {member.status}</span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl text-xs transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberProfileModal;
