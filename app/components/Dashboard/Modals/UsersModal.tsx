import React, { useState } from "react";
import { X, User, Mail, Phone, Building, Shield, GraduationCap } from "lucide-react";
import { useAddUserMutation } from "~/hooks/useApi";

interface UsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UsersModal: React.FC<UsersModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    committee: "UI/UX",
    role: "Member",
    academicYear: "3rd Year, CS",
  });

  const addUserMutation = useAddUserMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUserMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        onSuccess();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">Create User</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Sara Ahmed"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="sara@ieee.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="+20 100 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Committee
              </label>
              <select
                value={formData.committee}
                onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#4F46E5] outline-none"
              >
                <option value="UI/UX">UI/UX</option>
                <option value="AI">AI</option>
                <option value="CS">CS</option>
                <option value="Robotics">Robotics</option>
                <option value="Media">Media</option>
                <option value="Power">Power</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#4F46E5] outline-none"
              >
                <option value="Member">Member</option>
                <option value="Lead">Lead</option>
                <option value="Vice Head">Vice Head</option>
                <option value="Head">Head</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Academic Year
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. 3rd Year, ECE"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addUserMutation.isPending}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
            >
              {addUserMutation.isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersModal;
