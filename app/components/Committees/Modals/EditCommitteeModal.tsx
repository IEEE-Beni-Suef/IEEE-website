import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { CommitteeData } from "../DashboardCommitteeCard";

interface EditCommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  committee: CommitteeData | null;
  onSubmit: (updated: CommitteeData) => void;
  isLoading?: boolean;
}

export const EditCommitteeModal: React.FC<EditCommitteeModalProps> = ({
  isOpen,
  onClose,
  committee,
  onSubmit,
  isLoading = false,
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState<CommitteeData>({
    id: 0,
    name: "",
    description: "",
    location: "Faculty of Engineering, Lab 3",
    status: "Active",
    recruitmentStatus: "Open",
    headName: "Omar Khalil",
    headEmail: "omar@ieee-sb.org",
    headPhone: "+20 100 123 4567",
  });

  useEffect(() => {
    if (committee) {
      setFormData({
        ...committee,
        location: committee.location || "Faculty of Engineering, Lab 3",
        status: committee.status || "Active",
        recruitmentStatus: committee.recruitmentStatus || "Open",
        headName: committee.headName || "Omar Khalil",
        headEmail: committee.headEmail || "omar@ieee-sb.org",
        headPhone: committee.headPhone || "+20 100 123 4567",
      });
    }
  }, [committee]);

  if (!isOpen || !committee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-3xl rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">
            Edit — <span className="text-[#5A10A5] dark:text-purple-400">{committee.name}</span>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - COMMITTEE INFO */}
            <div className="space-y-4 text-xs font-medium">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Committee Info
              </span>

              {/* Committee Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Committee Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>

              {/* Status & Recruitment Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border outline-none transition-colors ${
                      isDark
                        ? "bg-[#161F33] border-[#232D42] text-white"
                        : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                    Recruitment
                  </label>
                  <select
                    value={formData.recruitmentStatus}
                    onChange={(e) => setFormData({ ...formData, recruitmentStatus: e.target.value })}
                    className={`w-full px-3 py-2.5 rounded-xl border outline-none transition-colors ${
                      isDark
                        ? "bg-[#161F33] border-[#232D42] text-white"
                        : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                    }`}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Unsaved Warning Alert */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5 text-amber-800 dark:text-amber-300 mt-4">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium leading-tight">
                  Unsaved changes will be lost if you close this modal.
                </span>
              </div>
            </div>

            {/* Right Column - HEAD INFORMATION */}
            <div className="space-y-4 text-xs font-medium">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Head Information
              </span>

              {/* Head Selected Card */}
              <div className="p-3 rounded-2xl border-2 border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    {getInitials(formData.headName || "OK")}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{formData.headName}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">Committee Head</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  ✓
                </div>
              </div>

              {/* Head Full Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Head Full Name
                </label>
                <input
                  type="text"
                  value={formData.headName}
                  onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>

              {/* Head Email */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Head Email
                </label>
                <input
                  type="email"
                  value={formData.headEmail}
                  onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>

              {/* Head Phone */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
                  Head Phone
                </label>
                <input
                  type="text"
                  value={formData.headPhone}
                  onChange={(e) => setFormData({ ...formData, headPhone: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-colors ${
                    isDark
                      ? "bg-[#161F33] border-[#232D42] text-white"
                      : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-xl border font-bold text-xs transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-gray-300 hover:bg-[#1E2738]"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommitteeModal;
