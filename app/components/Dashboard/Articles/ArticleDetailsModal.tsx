import React, { useState } from "react";
import {
  X,
  Pencil,
  Plus,
  Trash2,
  Eye,
  Heart,
  Clock,
  User as UserIcon,
  Save,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useTheme } from "~/hooks/useTheme";

interface SubsectionFormData {
  subtitle: string;
  paragraph: string;
  photo?: FileList;
}

interface ArticleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditArticle?: (article: any) => void;
  article: any;
  detailedArticle: any;
  detailsLoading: boolean;
  subsectionActionLoadingId: number | string | null;
  onCreateSubsection: (data: FormData) => void;
  onUpdateSubsection: (data: FormData) => void;
  onDeleteSubsection: (id: number) => void;
  getCategoryName: (categoryId: any) => string;
  editingSubsection: any;
  setEditingSubsection: (subsection: any) => void;
}

export function ArticleDetailsModal({
  isOpen,
  onClose,
  onEditArticle,
  article,
  detailedArticle,
  detailsLoading,
  subsectionActionLoadingId,
  onCreateSubsection,
  onUpdateSubsection,
  onDeleteSubsection,
  getCategoryName,
  editingSubsection,
  setEditingSubsection,
}: ArticleDetailsModalProps) {
  const { isDark } = useTheme();
  const [isAddingSubsection, setIsAddingSubsection] = useState(false);

  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    reset: resetNew,
    formState: { errors: errorsNew },
  } = useForm<SubsectionFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<SubsectionFormData>();

  if (!isOpen) return null;

  const currentArticle = detailedArticle || article;
  if (!currentArticle) return null;

  const title = currentArticle.title || "Untitled Article";
  const photo =
    currentArticle.photo ||
    currentArticle.image ||
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80";
  const categoryName = getCategoryName(currentArticle.categoryId);
  const authorName = currentArticle.authorName || currentArticle.author?.name || "IEEE Member";
  const authorRole = currentArticle.authorRole || "Author";
  const date = currentArticle.publishedDate || (currentArticle.createdAt ? new Date(currentArticle.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent");
  const readTime = currentArticle.readTime || "3 min read";
  const views = currentArticle.views !== undefined && currentArticle.views !== null ? currentArticle.views : 0;
  const likes = currentArticle.likes !== undefined && currentArticle.likes !== null ? currentArticle.likes : 0;
  const status = currentArticle.status || "Published";
  const keywords = currentArticle.keywords || [];

  const onSubmitNew = async (data: SubsectionFormData) => {
    const formData = new FormData();
    formData.append("subtitle", data.subtitle);
    formData.append("paragraph", data.paragraph);
    formData.append("articleId", (currentArticle.id || 1).toString());

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    await onCreateSubsection(formData);
    setIsAddingSubsection(false);
    resetNew();
  };

  const onSubmitEdit = async (data: SubsectionFormData) => {
    const formData = new FormData();
    formData.append("id", editingSubsection.id.toString());
    formData.append("subtitle", data.subtitle);
    formData.append("paragraph", data.paragraph);
    formData.append("articleId", (currentArticle.id || 1).toString());

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    await onUpdateSubsection(formData);
    setEditingSubsection(null);
    resetEdit();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl border overflow-hidden transition-all max-h-[90vh] flex flex-col ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        {/* Banner Hero Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-900 shrink-0">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges & Title in Banner */}
          <div className="absolute bottom-4 left-6 right-6 space-y-2 text-white">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#5A10A5] text-white shadow-md">
                {status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {categoryName}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight line-clamp-2 text-white drop-shadow-md">
              {title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Author Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-[#253047]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 font-extrabold text-sm flex items-center justify-center border border-purple-200 dark:border-purple-800">
                {authorName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {authorName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {date}
              </span>
              <span>•</span>
              <span>{readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-blue-500" /> {views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> {likes}
              </span>
            </div>
          </div>

          {/* Description / Overview Box */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-[#161F33] border border-purple-100/80 dark:border-[#253047] space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#5A10A5] dark:text-purple-300">
              Overview
            </h4>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              {currentArticle.description}
            </p>
          </div>

          {/* Keyword tags */}
          {keywords && keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {keywords.map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}

          {/* Subsections Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-[#253047]">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Subsections & Content Blocks
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingSubsection(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 hover:bg-purple-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Subsection
              </button>
            </div>

            {/* Form to add new subsection */}
            {isAddingSubsection && (
              <form
                onSubmit={handleSubmitNew(onSubmitNew)}
                className="p-4 rounded-2xl border border-purple-200 dark:border-[#253047] bg-purple-50/40 dark:bg-[#182033] space-y-3"
              >
                <input
                  type="text"
                  {...registerNew("subtitle", { required: true })}
                  placeholder="Subtitle heading..."
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border dark:border-[#253047] dark:bg-[#101726] text-gray-900 dark:text-white"
                />
                <textarea
                  rows={3}
                  {...registerNew("paragraph", { required: true })}
                  placeholder="Paragraph content..."
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium border dark:border-[#253047] dark:bg-[#101726] text-gray-900 dark:text-white resize-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingSubsection(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#5A10A5] text-white"
                  >
                    Save Subsection
                  </button>
                </div>
              </form>
            )}

            {/* List of existing subsections */}
            {currentArticle.subsections && currentArticle.subsections.length > 0 ? (
              <div className="space-y-3">
                {currentArticle.subsections.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl border border-gray-100 dark:border-[#253047] bg-gray-50/50 dark:bg-[#182033] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                        {sub.subtitle}
                      </h5>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onDeleteSubsection(sub.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {sub.photo && (
                      <img
                        src={sub.photo}
                        alt=""
                        className="w-full h-36 object-cover rounded-xl"
                      />
                    )}
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {sub.paragraph}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              !isAddingSubsection && (
                <p className="text-xs text-gray-400 italic">
                  No additional subsections added yet.
                </p>
              )
            )}
          </div>
        </div>

        {/* Modal Footer (Matching View Overlay design) */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 dark:border-[#253047] bg-gray-50/50 dark:bg-[#101726]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#182033]"
          >
            Close
          </button>

          {onEditArticle && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEditArticle(currentArticle);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#5A10A5] hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit Article
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
