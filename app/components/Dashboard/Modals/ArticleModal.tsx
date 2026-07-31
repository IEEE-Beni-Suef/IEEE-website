import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateArticleMutation } from "~/hooks/useApi";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    committee: "Select a Committee...",
    tags: "",
    content: "",
  });

  const createArticleMutation = useCreateArticleMutation();

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    createArticleMutation.mutate(
      { ...formData, isDraft },
      {
        onSuccess: () => {
          onClose();
          onSuccess();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">Create Article</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => handlePublish(e, false)} className="mt-6 space-y-4">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Article Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. IEEE Impact 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Committee & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Committee
              </label>
              <select
                value={formData.committee}
                onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500 outline-none transition-all text-gray-700 dark:text-gray-200"
              >
                <option value="Select a Committee...">Select a Committee...</option>
                <option value="Technical">Technical</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Media">Media</option>
                <option value="AI & Robotics">AI & Robotics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="tech, ai, design"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              rows={4}
              required
              placeholder="Write your article content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#000640] dark:focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400 resize-none"
            />
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
              type="button"
              onClick={(e) => handlePublish(e, true)}
              className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={createArticleMutation.isPending}
              className="px-7 py-2.5 bg-[#0C2340] hover:bg-[#08182D] text-white rounded-2xl text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
            >
              {createArticleMutation.isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;
