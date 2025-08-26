import React from "react";
import { Button } from "~/components/ui/Button";
import { Edit2, Trash2, Eye } from "lucide-react";
import type { Category } from "~/types/index";

interface ArticleCardProps {
  article: any;
  categories?: Category[];
  onEdit: (article: any) => void;
  onDelete: (id: number) => void;
  onViewDetails: (article: any) => void;
  actionLoadingId: number | null;
}

export function ArticleCard({
  article,
  categories,
  onEdit,
  onDelete,
  onViewDetails,
  actionLoadingId,
}: ArticleCardProps) {
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find((cat: Category) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Article Image */}
      {article.photo && (
        <div className="mb-4">
          <img
            src={article.photo}
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {getCategoryName(article.categoryId)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {article.description}
        </p>

        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.keywords
              .slice(0, 3)
              .map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            {article.keywords.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                +{article.keywords.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(article)}
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onEdit(article)}>
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(article.id)}
            disabled={actionLoadingId === article.id}
          >
            {actionLoadingId === article.id ? (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
            ) : (
              <Trash2 className="w-3 h-3 mr-1" />
            )}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
