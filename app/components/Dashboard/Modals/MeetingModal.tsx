import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, AlignLeft } from "lucide-react";
import { useCreateMeetingMutation } from "~/hooks/useApi";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    committee: "AI Committee",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const createMeetingMutation = useCreateMeetingMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMeetingMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        onSuccess();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">Create Meeting</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI Sync & Workshop"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Committee
            </label>
            <select
              value={formData.committee}
              onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#4F46E5] outline-none"
            >
              <option value="AI Committee">AI Committee</option>
              <option value="UI/UX Team">UI/UX Team</option>
              <option value="CS Department">CS Department</option>
              <option value="Robotics Branch">Robotics Branch</option>
              <option value="HighBoard General">HighBoard General</option>
            </select>
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#4F46E5] outline-none"
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
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#4F46E5] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Hall B & Online Google Meet"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">
              Description / Agenda
            </label>
            <textarea
              rows={3}
              placeholder="Describe meeting topics and goals..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#4F46E5] outline-none resize-none"
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
