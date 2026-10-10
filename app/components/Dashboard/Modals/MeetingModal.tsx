import React, { useState } from "react";
import { X, MapPin } from "lucide-react";
import { useCreateMeetingMutation, useCommittees } from "~/hooks/useApi";
import { extractArrayData } from "~/lib/api";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    recap: "",
    type: "General",
    date: "",
    time: "",
    committeeId: "1",
    headId: "1",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: rawCommittees = [] } = useCommittees();
  const committees = extractArrayData<any>(rawCommittees);

  const createMeetingMutation = useCreateMeetingMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let isoDateTime = new Date().toISOString();
    if (formData.date) {
      const timeStr = formData.time || "12:00";
      isoDateTime = new Date(`${formData.date}T${timeStr}`).toISOString();
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      recap: formData.recap || "Meeting recap",
      type: formData.type || "General",
      dateTime: isoDateTime,
      committeeId: Number(formData.committeeId) || 1,
      headId: Number(formData.headId) || 1,
    };

    createMeetingMutation.mutate(payload, {
      onSuccess: () => {
        setFormData({
          title: "",
          description: "",
          recap: "",
          type: "General",
          date: "",
          time: "",
          committeeId: "1",
          headId: "1",
        });
        onClose();
        onSuccess();
      },
      onError: (err: any) => {
        setErrorMessage(
          err?.message || "Failed to create meeting. Please try again."
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">
            Create Meeting
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600"
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
          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI Sync & Workshop"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Committee
              </label>
              <select
                value={formData.committeeId}
                onChange={(e) =>
                  setFormData({ ...formData, committeeId: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5]"
              >
                {committees.length > 0 ? (
                  committees.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name || `Committee ${c.id}`}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="1">UI/UX Committee</option>
                    <option value="2">AI Committee</option>
                    <option value="3">CS Committee</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Meeting Type
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sync / Technical / General"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
                Time
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Recap
            </label>
            <input
              type="text"
              placeholder="Short recap or agenda summary"
              value={formData.recap}
              onChange={(e) =>
                setFormData({ ...formData, recap: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe meeting topics and goals..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMeetingMutation.isPending}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              {createMeetingMutation.isPending ? "Creating..." : "Create Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingModal;
