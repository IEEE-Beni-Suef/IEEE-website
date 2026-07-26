import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this meeting?",
  isDeleting = false,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-2xl transition-colors duration-200 ${
          isDark ? "bg-[#101726] text-white border border-[#232D42]" : "bg-white text-[#000640]"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? "text-gray-400 hover:bg-[#1E2738]" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
        <p className={`text-sm mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {title}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
              isDark
                ? "border-[#27324A] text-gray-300 hover:bg-[#1E2738]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
};
