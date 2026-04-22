import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../ui/Button";
import { createEventSchema } from "~/utils/schemas";
import type { CreateEventFormData } from "~/utils/schemas";
import type { ApiCategory } from "~/types/api.types";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventFormData) => void;
  categories: ApiCategory[];
  isLoading?: boolean;
}

const EMPTY_FORM: CreateEventFormData = {
  name: "",
  keyWords: [],
  startDate: "",
  endDate: "",
  isCommingSoon: false,
  categoryId: "",
};

const toIso = (value: string): string | null =>
  value ? new Date(value).toISOString() : null;

export function CreateEventModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  isLoading = false,
}: CreateEventModalProps) {
  const [form, setForm]         = useState<CreateEventFormData>(EMPTY_FORM);
  const [kwInput, setKwInput]   = useState("");
  const [errors, setErrors]     = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setKwInput("");
      setErrors({});
    }
  }, [isOpen]);

  const set = <K extends keyof CreateEventFormData>(field: K, value: CreateEventFormData[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  // ── Keyword helpers ──────────────────────────────────────
  const addKeyword = () => {
    const kw = kwInput.trim();
    if (!kw || form.keyWords.includes(kw) || form.keyWords.length >= 10) return;
    set("keyWords", [...form.keyWords, kw]);
    setKwInput("");
  };

  const removeKeyword = (kw: string) =>
    set("keyWords", form.keyWords.filter((k) => k !== kw));

  const handleKwKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addKeyword(); }
  };

  // ── Submit ───────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Flush pending keyword input
    const pendingKw = kwInput.trim();
    const finalKeywords =
      pendingKw && !form.keyWords.includes(pendingKw)
        ? [...form.keyWords, pendingKw]
        : form.keyWords;

    const payload: CreateEventFormData = {
      ...form,
      keyWords: finalKeywords,
      startDate: form.isCommingSoon ? null : toIso(form.startDate as string),
      endDate:   form.isCommingSoon ? null : toIso(form.endDate as string),
    };

    const result = createEventSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Event">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Event Name */}
        <div className="space-y-1.5">
          <label htmlFor="event-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            id="event-name"
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Annual Hackathon 2025"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label htmlFor="event-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="event-category"
            value={form.categoryId}
            onChange={(e) => set("categoryId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">— Select a category —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId}</p>}
        </div>

        {/* Keywords */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Keywords <span className="text-red-500">*</span>
            <span className="ml-2 text-xs text-gray-400 font-normal">Enter or comma to add</span>
          </label>
          <div className="flex flex-wrap gap-2 min-h-[42px] p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
            {form.keyWords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              >
                {kw}
                <button type="button" onClick={() => removeKeyword(kw)} aria-label={`Remove ${kw}`} className="hover:opacity-70 transition-opacity">×</button>
              </span>
            ))}
            <input
              id="event-keywords"
              type="text"
              value={kwInput}
              onChange={(e) => setKwInput(e.target.value)}
              onKeyDown={handleKwKeyDown}
              onBlur={addKeyword}
              placeholder={form.keyWords.length === 0 ? "Type a keyword…" : ""}
              className="flex-1 min-w-[120px] bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
            />
          </div>
          {errors.keyWords && <p className="text-xs text-red-500">{errors.keyWords}</p>}
          <p className="text-xs text-gray-400">{form.keyWords.length}/10</p>
        </div>

        {/* Coming Soon toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              id="event-coming-soon"
              type="checkbox"
              checked={form.isCommingSoon}
              onChange={(e) => set("isCommingSoon", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Coming Soon</span>
        </label>

        {/* Date pickers */}
        {!form.isCommingSoon && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="event-start" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                id="event-start"
                type="datetime-local"
                value={form.startDate as string}
                onChange={(e) => set("startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="event-end" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="event-end"
                type="datetime-local"
                value={form.endDate as string}
                min={form.startDate as string}
                onChange={(e) => set("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Creating…" : "Create Event"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
