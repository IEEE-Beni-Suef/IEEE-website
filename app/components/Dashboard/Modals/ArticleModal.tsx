import React, { useState } from "react";
import { X, Upload, FileText, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { useCreateArticleMutation, useAllCategories } from "~/hooks/useApi";
import { extractArrayData } from "~/lib/api";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<{
    categoryId: string;
    title: string;
    description: string;
    keywords: string;
    occuredAt: string;
    photo: File | null;
    video: File | null;
  }>({
    categoryId: "3858",
    title: "",
    description: "",
    keywords: "",
    occuredAt: new Date().toISOString().slice(0, 16),
    photo: null,
    video: null,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: rawCategories = [] } = useAllCategories();
  const categories = extractArrayData<any>(rawCategories);

  const createArticleMutation = useCreateArticleMutation();

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload = new FormData();
    payload.append("CategoryId", formData.categoryId || "3858");
    payload.append("Title", formData.title);
    payload.append("Description", formData.description);
    payload.append("Keywords", formData.keywords);
    if (formData.photo) {
      payload.append("Photo", formData.photo);
    }
    if (formData.video) {
      payload.append("Video", formData.video);
    }
    const occuredIso = formData.occuredAt
      ? new Date(formData.occuredAt).toISOString()
      : new Date().toISOString();
    payload.append("Occuredat", occuredIso);

    createArticleMutation.mutate(payload, {
      onSuccess: () => {
        setFormData({
          categoryId: "3858",
          title: "",
          description: "",
          keywords: "",
          occuredAt: new Date().toISOString().slice(0, 16),
          photo: null,
          video: null,
        });
        onClose();
        onSuccess();
      },
      onError: (err: any) => {
        setErrorMessage(
          err?.message || "Failed to publish article. Please check input fields."
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">
            Create Article
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePublish} className="mt-4 space-y-4">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. IEEE Impact 2026"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500"
            />
          </div>

          {/* Category & Keywords Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Category
              </label>
              {categories.length > 0 ? (
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500"
                >
                  {categories.map((c: any) => (
                    <option key={c.id || c.categoryId} value={c.id || c.categoryId || "3858"}>
                      {c.name || c.title || `Category ${c.id}`}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  placeholder="Category ID (e.g. 3858)"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Keywords
              </label>
              <input
                type="text"
                required
                placeholder="e.g. tech, ai, web"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Write your article description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Occuredat */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Occurred At
            </label>
            <input
              type="datetime-local"
              required
              value={formData.occuredAt}
              onChange={(e) =>
                setFormData({ ...formData, occuredAt: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500"
            />
          </div>

          {/* Photo & Video Upload Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    photo: e.target.files?.[0] || null,
                  })
                }
                className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1 flex items-center gap-1">
                <VideoIcon className="w-3.5 h-3.5" /> Video (Optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    video: e.target.files?.[0] || null,
                  })
                }
                className="w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createArticleMutation.isPending}
              className="px-7 py-2.5 bg-[#0C2340] hover:bg-[#08182D] text-white rounded-2xl text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
            >
              {createArticleMutation.isPending ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;
