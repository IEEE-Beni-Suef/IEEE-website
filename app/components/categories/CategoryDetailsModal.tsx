import React from "react";
import { X, Wrench, Pencil } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";
import type { CategoryItem } from "./CategoryCard";

interface CategoryDetailsModalProps {
  isOpen: boolean;
  category: CategoryItem | null;
  onClose: () => void;
  onEdit: (cat: CategoryItem) => void;
}

export const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
  isOpen,
  category,
  onClose,
  onEdit,
}) => {
  const { isDark } = useTheme();

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all relative ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Category Details</h2>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-0.5">
              Viewing: {category.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2738] text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Info Banner */}
        <div className="my-5 p-5 rounded-2xl bg-purple-50/50 dark:bg-[#182033] border border-purple-100 dark:border-[#253047] flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#5A10A5] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
              {category.description ||
                "Hands-on technical skill-building sessions with guided instruction and practice."}
            </p>
          </div>
        </div>

        {/* Info Grid Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              STATUS
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
              {category.status}
            </span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TOTAL EVENTS
            </p>
            <p className="text-base font-extrabold text-gray-900 dark:text-white mt-0.5">
              {category.totalEvents}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              UPCOMING EVENTS
            </p>
            <p className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
              {category.upcomingEvents}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              CREATED
            </p>
            <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">
              {category.createdDate}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              LAST UPDATED
            </p>
            <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">
              {category.lastUpdated}
            </p>
          </div>

          <div
            className={`p-3.5 rounded-2xl border ${
              isDark ? "bg-[#182033] border-[#253047]" : "bg-purple-50/40 border-purple-100"
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              CATEGORY COLOR
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#5A10A5]" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                #5A10A5
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(category)}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" /> Edit Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsModal;
