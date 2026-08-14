import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { DashboardMember, UpdateMemberData } from "~/types/dashboard";
import { useUpdateMemberMutation } from "~/hooks/useApi";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: DashboardMember | null;
  onSuccess: () => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UpdateMemberData>({
    id: 0,
    name: "",
    email: "",
    committee: "",
    role: "",
    status: "Approved",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id,
        name: member.name,
        email: member.email,
        committee: member.committee,
        role: member.role,
        status: member.status,
      });
    }
  }, [member]);

  const updateMutation = useUpdateMemberMutation();

  if (!isOpen || !member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        onSuccess();
      },
    });
  };

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
          <div>
            <h3 className="text-xl font-bold text-[#000640] dark:text-white">Edit Member</h3>
            <p className="text-xs text-gray-400 font-medium">Editing member profile</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Badge Header */}
        <div className="mt-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
            {getInitials(formData.name || "SA")}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#000640] dark:text-white">
              {formData.name}
            </h4>
            <span className="text-xs text-gray-400">Editing member profile</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-purple-600 outline-none"
            />
          </div>

          {/* Committee & Role */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Committee
              </label>
              <input
                type="text"
                value={formData.committee}
                onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as DashboardMember["status"],
                })
              }
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-purple-600 outline-none"
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-2.5 bg-[#4B0082] hover:bg-[#3B0066] text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02]"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
