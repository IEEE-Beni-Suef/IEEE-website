import React from "react";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { CategoryItem } from "./CategoryCard";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  category: CategoryItem | null;
  onClose: () => void;
  onConfirm: (category: CategoryItem) => void;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  isOpen,
  category,
  onClose,
  onConfirm,
}) => {
  const { isDark } = useTheme();

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-sm rounded-3xl border p-6 text-center shadow-2xl transition-all ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2">
          Delete "{category.name}"?
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
          This action is permanent. The category will be removed from the system. Events currently assigned to it will not be deleted.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 border dark:border-[#253047] hover:bg-gray-50 dark:hover:bg-[#182033] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(category);
              onClose();
            }}
            className="py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 transition-all cursor-pointer"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
