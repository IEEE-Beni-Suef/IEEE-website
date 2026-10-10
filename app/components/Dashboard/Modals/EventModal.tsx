import React, { useState } from "react";
import { X } from "lucide-react";
import { useCreateEventMutation, useAllCategories } from "~/hooks/useApi";
import { extractArrayData } from "~/lib/api";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    keyWords: "",
    startDate: "",
    endDate: "",
    isCommingSoon: false,
    categoryId: "252dcd72-8b6e-c1ef-2e9d-336b0e508390",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: rawCategories = [] } = useAllCategories();
  const categories = extractArrayData<any>(rawCategories);

  const createEventMutation = useCreateEventMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const keyWordsArray = formData.keyWords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const isoStart = formData.startDate
      ? new Date(formData.startDate).toISOString()
      : new Date().toISOString();
    const isoEnd = formData.endDate
      ? new Date(formData.endDate).toISOString()
      : new Date().toISOString();

    const payload = {
      name: formData.name,
      keyWords: keyWordsArray.length > 0 ? keyWordsArray : ["IEEE", "Event"],
      startDate: isoStart,
      endDate: isoEnd,
      isCommingSoon: formData.isCommingSoon,
      categoryId: formData.categoryId || "252dcd72-8b6e-c1ef-2e9d-336b0e508390",
    };

    createEventMutation.mutate(payload, {
      onSuccess: () => {
        setFormData({
          name: "",
          keyWords: "",
          startDate: "",
          endDate: "",
          isCommingSoon: false,
          categoryId: "252dcd72-8b6e-c1ef-2e9d-336b0e508390",
        });
        onClose();
        onSuccess();
      },
      onError: (err: any) => {
        setErrorMessage(
          err?.message || "Failed to create event. Please check input fields."
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">
            Create Event
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Event Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Technical Workshop 2026"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. workshop, ai, robotics"
              value={formData.keyWords}
              onChange={(e) =>
                setFormData({ ...formData, keyWords: e.target.value })
              }
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
            />
          </div>

          {/* Category ID / Category Selection */}
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
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
              >
                {categories.map((c: any) => (
                  <option key={c.id || c.categoryId} value={c.id || c.categoryId || "252dcd72-8b6e-c1ef-2e9d-336b0e508390"}>
                    {c.name || c.title || `Category ${c.id}`}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                required
                placeholder="Category GUID (e.g. 252dcd72-8b6e-c1ef-2e9d-336b0e508390)"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
              />
            )}
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#2E0B5D]"
              />
            </div>
          </div>

          {/* Coming Soon Toggle */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isCommingSoon"
              checked={formData.isCommingSoon}
              onChange={(e) =>
                setFormData({ ...formData, isCommingSoon: e.target.checked })
              }
              className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer"
            />
            <label
              htmlFor="isCommingSoon"
              className="text-xs font-bold text-[#000640] dark:text-gray-300 cursor-pointer"
            >
              Mark as Coming Soon Event
            </label>
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
              disabled={createEventMutation.isPending}
              className="px-7 py-2.5 bg-[#2A064E] hover:bg-[#1E0439] text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02]"
            >
              {createEventMutation.isPending ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
