import { Link } from "react-router";
import type { Article } from "~/types";

interface ArticleDisplayProps {
  article: Article;
}

export function ArticleDisplay({ article }: ArticleDisplayProps) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.photo}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {article.categoryName}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {article.keywords.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              {keyword}
            </span>
          ))}
          {article.keywords.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
              +{article.keywords.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
