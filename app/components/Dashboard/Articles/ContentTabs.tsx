import React from "react";

interface ContentTabsProps {
  activeTab: "articles" | "categories";
  setActiveTab: (tab: "articles" | "categories") => void;
  activeStatusTab?: string;
  setActiveStatusTab?: (status: string) => void;
  counts?: {
    all: number;
    published: number;
    drafts: number;
    scheduled: number;
    archived: number;
  };
}

export function ContentTabs({
  activeTab,
  setActiveTab,
  activeStatusTab = "all",
  setActiveStatusTab,
  counts = { all: 12, published: 6, drafts: 2, scheduled: 3, archived: 1 },
}: ContentTabsProps) {
  const statusTabs = [
    { id: "all", label: "All Articles", count: counts.all },
    { id: "published", label: "Published", count: counts.published },
    { id: "draft", label: "Drafts", count: counts.drafts },
    { id: "scheduled", label: "Scheduled", count: counts.scheduled },
    { id: "archived", label: "Archived", count: counts.archived },
  ];

  return (
    <div className="border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Primary Section Tabs */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("articles")}
          className={`pb-3 text-sm font-extrabold border-b-2 transition-all cursor-pointer ${
            activeTab === "articles"
              ? "border-[#5A10A5] text-[#5A10A5]"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          Articles ({counts.all})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`pb-3 text-sm font-extrabold border-b-2 transition-all cursor-pointer ${
            activeTab === "categories"
              ? "border-[#5A10A5] text-[#5A10A5]"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Article Status Sub-filters */}
      {activeTab === "articles" && setActiveStatusTab && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {statusTabs.map((t) => {
            const isActive = activeStatusTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveStatusTab(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#5A10A5] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.label} <span className="opacity-80">({t.count})</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

