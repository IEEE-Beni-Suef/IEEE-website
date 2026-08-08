import React from "react";
import {
  Eye,
  Pencil,
  Copy,
  Archive,
  Trash2,
  Heart,
  MessageSquare,
  Clock,
} from "lucide-react";
import type { Category } from "~/types/index";

interface ArticleCardProps {
  article: any;
  categories?: Category[];
  onEdit: (article: any) => void;
  onDelete: (article: any) => void;
  onDuplicate?: (article: any) => void;
  onArchive?: (article: any) => void;
  onViewDetails: (article: any) => void;
  actionLoadingId?: number | string | null;
}

export function ArticleCard({
  article,
  categories,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  onViewDetails,
  actionLoadingId,
}: ArticleCardProps) {
  const getCategoryName = (categoryId: any) => {
    if (!categoryId) return "General";
    const category = categories?.find(
      (cat: Category) => cat.id.toString() === categoryId.toString()
    );
    return category ? category.name : "Security";
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || article.status || "Published").toLowerCase();
    if (s === "published") {
      return {
        label: "Published",
        bg: "bg-emerald-100 text-emerald-700",
      };
    }
    if (s === "scheduled") {
      return {
        label: "Scheduled",
        bg: "bg-blue-100 text-blue-700",
      };
    }
    if (s === "draft") {
      return {
        label: "Draft",
        bg: "bg-amber-100 text-amber-700",
      };
    }
    return {
      label: "Archived",
      bg: "bg-gray-100 text-gray-700",
    };
  };

  const statusBadge = getStatusBadge(article.status);
  const categoryName = getCategoryName(article.categoryId);
  const authorName = article.authorName || article.author?.name || "Mostafa Ali";
  const readTime = article.readTime || "5 min read";
  const views = article.views || "4.4K";
  const likes = article.likes || 128;
  const comments = article.comments || 24;
  const publishedDate = article.publishedDate || "Aug 1, 2025";

  return (
    <div
      onClick={() => onViewDetails(article)}
      className="group rounded-2xl border border-purple-100 bg-white overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between hover:border-purple-300 hover:shadow-md"
    >
      <div>
        {/* Cover Image & Badges Overlay */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <img
            src={
              article.photo ||
              article.image ||
              "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
            }
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#5A10A5] text-white shadow-xs">
            {categoryName}
          </span>

          {/* Status Badge */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${statusBadge.bg}`}
          >
            {statusBadge.label}
          </span>

          {/* Date info */}
          <span className="absolute bottom-2 left-3 text-[11px] text-white/90 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-purple-300" />
            {publishedDate}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <h3 className="text-base font-extrabold text-gray-900 line-clamp-2 transition-colors group-hover:text-[#5A10A5]">
            {article.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {article.description}
          </p>

          {/* Keywords / Tags */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {article.keywords.slice(0, 3).map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-[#5A10A5]"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Metrics bar */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 pt-2 border-t border-purple-50">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-500" /> {views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> {likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> {comments}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Author & Action Buttons */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-purple-50">
          {/* Author avatar & info */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-100 text-[#5A10A5] font-bold text-xs flex items-center justify-center overflow-hidden">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                authorName.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {authorName}
              </p>
              <p className="text-[10px] text-gray-400">{readTime}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onViewDetails(article)}
              title="View Article Details"
              className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onEdit(article)}
              title="Edit Article"
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>

            {onDuplicate && (
              <button
                type="button"
                onClick={() => onDuplicate(article)}
                title="Duplicate Article"
                className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}

            {onArchive && (
              <button
                type="button"
                onClick={() => onArchive(article)}
                title="Archive Article"
                className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
              >
                <Archive className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(article)}
              disabled={actionLoadingId === article.id}
              title="Delete Article"
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

