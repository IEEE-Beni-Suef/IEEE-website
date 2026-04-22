import React from "react";
import { FileText, FolderOpen, Tag, Eye, Calendar } from "lucide-react";

interface ContentStatsProps {
  totalArticles: number;
  totalCategories: number;
}

export function ContentStats({
  totalArticles,
  totalCategories,
}: ContentStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Articles
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalArticles}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Categories
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalCategories}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Published
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalArticles}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              This Month
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalArticles}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
