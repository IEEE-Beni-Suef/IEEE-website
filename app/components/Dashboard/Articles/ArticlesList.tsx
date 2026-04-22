import React from "react";
import { FileText } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { Category } from "~/types/index";

interface ArticlesListProps {
  articles: any[];
  categories?: Category[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  searchTerm: string;
  selectedCategory: string;
  actionLoadingId: number | null;
  onEdit: (article: any) => void;
  onDelete: (id: number) => void;
  onViewDetails: (article: any) => void;
}

export function ArticlesList({
  articles,
  categories,
  isLoading,
  isError,
  error,
  searchTerm,
  selectedCategory,
  actionLoadingId,
  onEdit,
  onDelete,
  onViewDetails,
}: ArticlesListProps) {
  const filteredArticles =
    articles?.filter((article: any) => {
      const matchesSearch =
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.keywords?.some((keyword: string) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        !selectedCategory ||
        article.categoryId?.toString() === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Articles ({filteredArticles.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading articles...</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-red-500">
                <FileText className="w-full h-full" />
              </div>
              <p className="text-red-600 dark:text-red-400 font-medium">
                {(error as Error)?.message || "Failed to load articles"}
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredArticles.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    {searchTerm || selectedCategory
                      ? "No articles match your filters"
                      : "No articles found"}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {searchTerm || selectedCategory
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first article"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredArticles.map((article: any) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categories={categories}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                    actionLoadingId={actionLoadingId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
