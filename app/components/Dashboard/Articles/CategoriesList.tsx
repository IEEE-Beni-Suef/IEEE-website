import React from "react";
import { Button } from "~/components/ui/Button";
import { Edit2, Trash2, FolderOpen } from "lucide-react";
import type { Category } from "~/types/index";
import { useTheme } from "~/hooks/useTheme";

interface CategoriesListProps {
  categories?: Category[];
  categoriesLoading: boolean;
  categoryActionLoadingId: number | null;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export function CategoriesList({
  categories,
  categoriesLoading,
  categoryActionLoadingId,
  onEdit,
  onDelete,
}: CategoriesListProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-xs transition-colors ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-purple-100"
      }`}
    >
      <div className="px-6 py-4 border-b border-gray-100 dark:border-[#253047] flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          All Categories ({categories?.length || 0})
        </h2>
      </div>

      <div className="overflow-x-auto">
        {categoriesLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-[#5A10A5] border-t-transparent rounded-full animate-spin"></div>
              <span>Loading categories...</span>
            </div>
          </div>
        )}

        {!categoriesLoading && (
          <>
            {!categories || categories.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 font-medium">No categories found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Get started by creating your first category
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-[#253047]">
                {categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className={`px-6 py-4 transition-colors ${
                      isDark ? "hover:bg-[#182033]" : "hover:bg-purple-50/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 rounded-xl flex items-center justify-center mr-4">
                          <FolderOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Category ID: #{category.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(category)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#182033] flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(category.id)}
                          disabled={categoryActionLoadingId === category.id}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1 disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
