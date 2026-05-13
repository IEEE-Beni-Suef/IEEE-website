import React from "react";
import { Button } from "~/components/ui/Button";
import { Edit2, Trash2, FolderOpen } from "lucide-react";
import type { Category } from "~/types/index";

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          All Categories ({categories?.length || 0})
        </h2>
      </div>

      <div className="overflow-x-auto">
        {categoriesLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
                  <p className="text-gray-500 font-medium">
                    No categories found
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Get started by creating your first category
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {categories.map((category: Category) => (
                  <div
                    key={category.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <FolderOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Category ID: {category.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onEdit(category)}
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(category.id)}
                          disabled={categoryActionLoadingId === category.id}
                        >
                          {categoryActionLoadingId === category.id ? (
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
                          ) : (
                            <Trash2 className="w-3 h-3 mr-1" />
                          )}
                          Delete
                        </Button>
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
