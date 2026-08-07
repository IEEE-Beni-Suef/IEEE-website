import React from "react";
import { Copy, Archive, Trash2, CheckCircle2, X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

type ModalMode = "duplicate" | "archive" | "delete" | "success";

interface ArticleConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  mode: ModalMode;
  articleTitle?: string;
  successMessage?: string;
  loading?: boolean;
}

export function ArticleConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  mode,
  articleTitle = "this article",
  successMessage = "Action completed successfully!",
  loading = false,
}: ArticleConfirmationModalProps) {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border text-center transition-all ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        {mode === "duplicate" && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-300 flex items-center justify-center">
              <Copy className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Duplicate Article?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-2">
              A copy of <span className="font-semibold text-gray-700 dark:text-gray-200">"{articleTitle}"</span> will be created in Drafts. You can edit and publish it independently.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182033]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50"
              >
                {loading ? "Duplicating..." : "Duplicate"}
              </button>
            </div>
          </div>
        )}

        {mode === "archive" && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <Archive className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Archive Article?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">"{articleTitle}"</span> will be moved to Archived. It will remain in the system but won't appear in public feeds.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182033]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                {loading ? "Archiving..." : "Archive"}
              </button>
            </div>
          </div>
        )}

        {mode === "delete" && (
          <div className="space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Delete Article?</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">"{articleTitle}"</span> will be permanently deleted. This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182033]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        )}

        {mode === "success" && (
          <div className="space-y-4 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {successMessage}
            </h3>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-6 rounded-xl text-xs font-bold bg-[#5A10A5] hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
