import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { useCreateEventMutation } from "~/hooks/useApi";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    capacity: 100,
    description: "",
  });

  const createEventMutation = useCreateEventMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEventMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        onSuccess();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">Create Event</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Technical Workshop 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all"
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Location & Capacity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Venue or online link"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#000640] dark:text-gray-300 mb-1">
                Capacity
              </label>
              <input
                type="number"
                placeholder="Max attendees"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all"
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
              placeholder="Describe the event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-2xl text-sm font-semibold text-gray-900 placeholder:text-gray-500 placeholder:font-normal focus:ring-2 focus:ring-[#2E0B5D] outline-none transition-all resize-none"
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
