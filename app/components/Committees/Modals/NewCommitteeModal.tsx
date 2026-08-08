import React, { useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface NewCommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    headName: string;
    headEmail: string;
    viceHeadName: string;
    viceHeadEmail: string;
    description: string;
    recruitmentStatus: string;
  }) => void;
  isLoading?: boolean;
}

export const NewCommitteeModal: React.FC<NewCommitteeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    headName: "",
    headEmail: "",
    viceHeadName: "",
    viceHeadEmail: "",
    description: "",
    recruitmentStatus: "Open",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border transition-all max-h-[90vh] overflow-y-auto ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-5 border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">New Committee</h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          {/* Committee Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Committee Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI & Machine Learning"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </div>

          {/* Committee Head Full Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Committee Head (Full Name)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ahmed Mahmoud"
              value={formData.headName}
              onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
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
              required
              placeholder="e.g. head@ieee-sb.org"
              value={formData.headEmail}
              onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </div>

          {/* Vice-Head Committee (Full Name) */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Vice-Head Committee (Full Name)
            </label>
            <input
              type="text"
              placeholder="e.g. Ahmed Mahmoud"
              value={formData.viceHeadName}
              onChange={(e) => setFormData({ ...formData, viceHeadName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </div>

          {/* Vice-Head Committee Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Vice-Head Committee Email
            </label>
            <input
              type="email"
              placeholder="e.g. head@ieee-sb.org"
              value={formData.viceHeadEmail}
              onChange={(e) => setFormData({ ...formData, viceHeadEmail: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
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
              placeholder="Brief description of the committee's purpose and activities..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white placeholder:text-gray-600"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900 placeholder:text-gray-400"
              }`}
            />
          </div>

          {/* Recruitment Status */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">
              Recruitment
            </label>
            <select
              value={formData.recruitmentStatus}
              onChange={(e) => setFormData({ ...formData, recruitmentStatus: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                isDark
                  ? "bg-[#161F33] border-[#232D42] text-white"
                  : "bg-[#F8FAFC] border-[#EEF0FF] text-gray-900"
              }`}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#5A10A5] hover:bg-[#4A0D88] text-white font-bold text-sm transition-colors shadow-md disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Submit New Committee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCommitteeModal;
