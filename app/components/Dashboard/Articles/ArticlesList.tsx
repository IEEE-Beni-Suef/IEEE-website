import React from "react";
import { FileText, Plus, Eye, Pencil, Copy, Archive, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { Category } from "~/types/index";
import type { ArticleViewMode, FilterState } from "./ArticleFilters";

interface ArticlesListProps {
  articles: any[];
  categories?: Category[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  filters: FilterState;
  activeStatusTab: string;
  viewMode: ArticleViewMode;
  actionLoadingId: number | string | null;
  onEdit: (article: any) => void;
  onDelete: (article: any) => void;
  onDuplicate?: (article: any) => void;
  onArchive?: (article: any) => void;
  onViewDetails: (article: any) => void;
  onCreateClick?: () => void;
}

export function ArticlesList({
  articles,
  categories,
  isLoading,
  isError,
  error,
  filters,
  activeStatusTab,
  viewMode,
  actionLoadingId,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  onViewDetails,
  onCreateClick,
}: ArticlesListProps) {
  const getCategoryName = (categoryId: any) => {
    if (!categoryId) return "General";
    const category = categories?.find(
      (cat: Category) => cat.id.toString() === categoryId.toString()
    );
    return category ? category.name : "Security";
  };

  // Filtering logic
  const filteredArticles = (articles || []).filter((article: any) => {
    const matchesSearch =
      !filters.search ||
      article.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      article.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
      article.keywords?.some((keyword: string) =>
        keyword.toLowerCase().includes(filters.search.toLowerCase())
      );

    const matchesCategory =
      !filters.category ||
      article.categoryId?.toString() === filters.category.toString();

    const matchesTag =
      !filters.tag ||
      article.keywords?.some((k: string) =>
        k.toLowerCase().includes(filters.tag.toLowerCase())
      );

    const articleStatus = (article.status || "Published").toLowerCase();
    const matchesStatus =
      activeStatusTab === "all" ||
      articleStatus === activeStatusTab.toLowerCase();

    return matchesSearch && matchesCategory && matchesTag && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-12 text-center shadow-xs">
        <div className="w-8 h-8 mx-auto border-3 border-[#5A10A5] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 font-medium text-xs">Loading articles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-12 text-center shadow-xs">
        <FileText className="w-12 h-12 mx-auto text-rose-500 mb-3" />
        <p className="text-rose-600 font-bold text-sm">
          {(error as Error)?.message || "Failed to load articles"}
        </p>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-12 text-center shadow-xs transition-colors">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-[#5A10A5] flex items-center justify-center mb-4 shadow-inner">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          No Articles Yet
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
          {filters.search || filters.category || filters.tag || activeStatusTab !== "all"
            ? "No articles match your current search or filter criteria. Try resetting filters."
            : "Create your first IEEE article to start publishing content for your members and community."}
        </p>

        {onCreateClick && (
          <button
            type="button"
            onClick={onCreateClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#5A10A5] hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" /> Create Article
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. GRID VIEW MODE */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((article: any) => (
            <ArticleCard
              key={article.id}
              article={article}
              categories={categories}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onArchive={onArchive}
              onViewDetails={onViewDetails}
              actionLoadingId={actionLoadingId}
            />
          ))}
        </div>
      )}

      {/* 2. LIST VIEW MODE */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredArticles.map((article: any) => {
            const catName = getCategoryName(article.categoryId);
            const status = (article.status || "Published").toLowerCase();
            const statusBadge =
              status === "published"
                ? "bg-emerald-100 text-emerald-700"
                : status === "scheduled"
                ? "bg-blue-100 text-blue-700"
                : status === "draft"
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-gray-700";

            return (
              <div
                key={article.id}
                onClick={() => onViewDetails(article)}
                className="p-4 rounded-2xl border border-purple-100 bg-white hover:border-purple-300 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={
                        article.photo ||
                        article.image ||
                        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5A10A5] text-white">
                        {catName}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}`}
                      >
                        {article.status || "Published"}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 truncate hover:text-[#5A10A5]">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-400 truncate">
                      {article.authorName || "Mostafa Ali"} • {article.publishedDate || "Aug 1, 2025"} • {article.readTime || "5 min read"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex items-center justify-end gap-1 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onViewDetails(article)}
                    title="View Details"
                    className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(article)}
                    title="Edit Article"
                    className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {onDuplicate && (
                    <button
                      type="button"
                      onClick={() => onDuplicate(article)}
                      title="Duplicate"
                      className="p-2 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                  {onArchive && (
                    <button
                      type="button"
                      onClick={() => onArchive(article)}
                      title="Archive"
                      className="p-2 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(article)}
                    title="Delete"
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. TABLE VIEW MODE */}
      {viewMode === "table" && (
        <div className="rounded-2xl border border-purple-100 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="font-bold uppercase tracking-wider border-b bg-purple-50/50 border-purple-100 text-gray-500">
                <tr>
                  <th className="p-4">ARTICLE</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">AUTHOR</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">VIEWS</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {filteredArticles.map((article: any) => {
                  const catName = getCategoryName(article.categoryId);
                  return (
                    <tr
                      key={article.id}
                      onClick={() => onViewDetails(article)}
                      className="group cursor-pointer transition-colors hover:bg-purple-50/30"
                    >
                      <td className="p-4 min-w-[220px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              article.photo ||
                              "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80"
                            }
                            alt=""
                            className="w-9 h-9 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-gray-900 group-hover:text-[#5A10A5] truncate">
                              {article.title}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">
                              {article.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-100 text-[#5A10A5]">
                          {catName}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700 font-medium">
                        {article.authorName || "Mostafa Ali"}
                      </td>
                      <td className="p-4 text-gray-500 whitespace-nowrap">
                        {article.publishedDate || "Aug 1, 2025"}
                      </td>
                      <td className="p-4 font-semibold text-gray-700">
                        {article.views || "4.4K"}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                          {article.status || "Published"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => onViewDetails(article)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onEdit(article)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(article)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination & Rows per page bar */}
      <div className="p-4 rounded-2xl border border-purple-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 shadow-2xs">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select className="px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 outline-none">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <span className="font-semibold text-gray-600">
          Showing 1-12 of {filteredArticles.length}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 cursor-pointer disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-lg bg-[#5A10A5] text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

