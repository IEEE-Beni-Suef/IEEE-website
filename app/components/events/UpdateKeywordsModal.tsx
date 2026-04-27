import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../ui/Button";
import { updateEventKeywordsSchema } from "~/utils/schemas";
import type { UpdateEventKeywordsFormData } from "~/utils/schemas";

interface UpdateKeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKeywords: string[];
  onSubmit: (data: UpdateEventKeywordsFormData) => void;
  isLoading?: boolean;
}

export function UpdateKeywordsModal({
  isOpen,
  onClose,
  currentKeywords,
  onSubmit,
  isLoading = false,
}: UpdateKeywordsModalProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setKeywords(currentKeywords);
      setInput("");
      setError("");
    }
  }, [isOpen, currentKeywords]);

  const addKeyword = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (keywords.includes(trimmed)) {
      setError("Keyword already added");
      return;
    }
    if (keywords.length >= 10) {
      setError("Maximum 10 keywords allowed");
      return;
    }
    setKeywords((prev) => [...prev, trimmed]);
    setInput("");
    setError("");
  };

  const removeKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Flush any pending input
    const pending = input.trim();
    const finalKeywords = pending && !keywords.includes(pending)
      ? [...keywords, pending]
      : keywords;

    const result = updateEventKeywordsSchema.safeParse({ keyWords: finalKeywords });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid keywords");
      return;
    }
    onSubmit(result.data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Keywords">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Chips */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Keywords <span className="text-red-500">*</span>
            <span className="ml-2 text-xs text-gray-400 font-normal">Press Enter or comma to add</span>
          </label>
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {kw}
                <button
                  type="button"
                  onClick={() => removeKeyword(kw)}
                  className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Remove ${kw}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              id="keywords-input"
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              onBlur={addKeyword}
              placeholder={keywords.length === 0 ? "Type a keyword…" : ""}
              className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className="text-xs text-gray-400">{keywords.length}/10 keywords</p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving…" : "Update Keywords"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
