import React, { useState } from "react";
import { X, Plus, Calendar, Clock } from "lucide-react";
import { useCommittees } from "~/hooks/useApi";
import { useTheme } from "~/hooks/useTheme";

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meetingData: any) => void;
  isSubmitting?: boolean;
}

export const NewMeetingModal: React.FC<NewMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const { isDark } = useTheme();
  const { data: committees } = useCommittees();

  const [status, setStatus] = useState<"Upcoming" | "Completed" | "Cancelled">("Upcoming");
  const [title, setTitle] = useState("");
  const [committeeId, setCommitteeId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [expectedAttendance, setExpectedAttendance] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !committeeId) return;

    const payload = {
      title,
      type: status,
      description: description || "Meeting description",
      recap: `Time: ${startTime} - ${endTime}`,
      committeeId: Number(committeeId),
      headId: 1, // Default or selected head ID
      users: [],
      date,
      expectedAttendance: Number(expectedAttendance) || 0,
      startTime,
      endTime,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-colors duration-200 ${
          isDark ? "bg-[#101726] text-white border border-[#232D42]" : "bg-white text-[#000640]"
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? "bg-[#232C47] text-[#A78BFA]" : "bg-[#F3E8FF] text-[#5A10A5]"
              }`}
            >
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">New Meeting</h2>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Fill in the details to schedule a meeting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? "text-gray-400 hover:bg-[#1E2738]" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStatus("Upcoming")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold border transition-all ${
                status === "Upcoming"
                  ? "bg-[#DCFCE7] text-[#166534] border-[#86EFAC]"
                  : isDark
                  ? "border-[#27324A] text-gray-300 hover:bg-[#1A2336]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setStatus("Completed")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold border transition-all ${
                status === "Completed"
                  ? "bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]"
                  : isDark
                  ? "border-[#27324A] text-gray-300 hover:bg-[#1A2336]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => setStatus("Cancelled")}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold border transition-all ${
                status === "Cancelled"
                  ? "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]"
                  : isDark
                  ? "border-[#27324A] text-gray-300 hover:bg-[#1A2336]"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Meeting Title */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Meeting Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekly Design Sync"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                isDark
                  ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                  : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
              }`}
            />
          </div>

          {/* Committee Select */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Committee *
            </label>
            <select
              required
              value={committeeId}
              onChange={(e) => setCommitteeId(e.target.value ? Number(e.target.value) : "")}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                isDark
                  ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                  : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
              }`}
            >
              <option value="">Select a Committee...</option>
              {committees?.map((c) => (
                <option key={c.id} value={c.id} className={isDark ? "bg-[#182033]" : ""}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this meeting about?"
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all resize-none ${
                isDark
                  ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                  : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
              }`}
            />
          </div>

          {/* Date & Expected Attendance */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                    isDark
                      ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                      : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
                  }`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Expected Attendance
              </label>
              <input
                type="number"
                value={expectedAttendance}
                onChange={(e) => setExpectedAttendance(e.target.value)}
                placeholder="e.g. 40"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                  isDark
                    ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                    : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
                }`}
              />
            </div>
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                  isDark
                    ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                    : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none border transition-all ${
                  isDark
                    ? "bg-[#182033] border-[#263148] text-white focus:border-[#7C3AED]"
                    : "bg-[#F8FAFC] border-gray-200 text-gray-900 focus:border-[#5A10A5]"
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200/10">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                isDark
                  ? "border-[#27324A] text-gray-300 hover:bg-[#1E2738]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#5A10A5] hover:bg-[#4A0D88] transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {isSubmitting ? "Creating..." : "Create Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
