import React from "react";
import { FileText, FolderOpen } from "lucide-react";

interface ContentTabsProps {
  activeTab: "articles" | "categories";
  setActiveTab: (tab: "articles" | "categories") => void;
}

export function ContentTabs({ activeTab, setActiveTab }: ContentTabsProps) {
  return (
    <div className="mt-6">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("articles")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "articles"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            Articles
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FolderOpen className="w-4 h-4 inline-block mr-2" />
            Categories
          </button>
        </nav>
      </div>
    </div>
  );
}
