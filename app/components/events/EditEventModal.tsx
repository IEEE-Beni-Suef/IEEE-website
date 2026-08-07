import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Save } from "lucide-react";
import type { ApiEvent } from "~/types/api.types";

interface EditEventModalProps {
  isOpen: boolean;
  event: ApiEvent | null;
  onClose: () => void;
  onSave?: (updatedEvent: any) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  event,
  onClose,
  onSave,
}) => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const [name, setName] = useState("");
  const [committee, setCommittee] = useState("CS");
  const [category, setCategory] = useState("Workshop");
  const [status, setStatus] = useState("Registration Open");
  const [date, setDate] = useState("2025-08-01");
  const [time, setTime] = useState("18:00");
  const [location, setLocation] = useState("Faculty of Computers");
  const [capacity, setCapacity] = useState("250");
  const [speaker, setSpeaker] = useState("Dr. Ahmed Hassan");

  useEffect(() => {
    if (event) {
      setName(event.name || "AI Workshop");
      setShowSuccessOverlay(false);
    }
  }, [event, isOpen]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        ...event,
        name,
      });
    }
    setShowSuccessOverlay(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl relative transition-all">
        {/* Success Confirmation Overlay */}
        {showSuccessOverlay ? (
          <div className="py-8 px-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 max-w-xs leading-snug mb-8">
              You Have Successfully Edited the Events Details
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowSuccessOverlay(false);
                onClose();
              }}
              className="w-44 py-3 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Edit Event</h2>
                <p className="text-xs text-purple-600 font-medium mt-0.5">
                  Update details for {event.name}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Committee
                  </label>
                  <select
                    value={committee}
                    onChange={(e) => setCommittee(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="CS">CS</option>
                    <option value="RAS">RAS</option>
                    <option value="WIE">WIE</option>
                    <option value="PES">PES</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Orientation">Orientation</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Summit">Summit</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Registration Open">Registration Open</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Speaker / Host
                </label>
                <input
                  type="text"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditEventModal;
