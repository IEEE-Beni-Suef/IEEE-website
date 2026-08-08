import React, { useState } from "react";
import { X, Clock, Calendar, CheckCircle2, Users } from "lucide-react";

interface ScheduleEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  recipientsCount: number;
  onConfirmSchedule: (scheduledDateTime: string) => void;
}

export const ScheduleEmailModal: React.FC<ScheduleEmailModalProps> = ({
  isOpen,
  onClose,
  subject,
  recipientsCount,
  onConfirmSchedule,
}) => {
  const [scheduledDate, setScheduledDate] = useState("2026-08-09");
  const [scheduledTime, setScheduledTime] = useState("14:00");
  const [selectedQuick, setSelectedQuick] = useState<string | null>("Tomorrow 2 PM");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formattedScheduleText, setFormattedScheduleText] = useState("Tomorrow at 02:00 PM");

  if (!isOpen) return null;

  const quickOptions = [
    { label: "Tomorrow 9 AM", date: "2026-08-09", time: "09:00", formatted: "Tomorrow, 9:00 AM" },
    { label: "Tomorrow 2 PM", date: "2026-08-09", time: "14:00", formatted: "Tomorrow, 2:00 PM" },
    { label: "Friday 8 PM", date: "2026-08-14", time: "20:00", formatted: "Friday, August 14 at 08:00 PM" },
    { label: "Monday 10 PM", date: "2026-08-10", time: "22:00", formatted: "Monday, August 10 at 10:00 PM" },
  ];

  const handleQuickSelect = (opt: typeof quickOptions[0]) => {
    setSelectedQuick(opt.label);
    setScheduledDate(opt.date);
    setScheduledTime(opt.time);
    setFormattedScheduleText(opt.formatted);
  };

  const handleConfirm = () => {
    let finalFormatted = formattedScheduleText;
    if (!selectedQuick) {
      finalFormatted = `${scheduledDate} at ${scheduledTime}`;
    }
    setIsConfirmed(true);
    onConfirmSchedule(finalFormatted);
  };

  const handleDone = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        {!isConfirmed ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#17A2B8]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#000640]">Schedule Email</h3>
                  <p className="text-xs text-gray-500">Choose when to send this email</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Preview Container */}
            <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Scheduling</p>
              <p className="text-sm font-bold text-[#000640] truncate">
                {subject && subject.trim() ? subject : "(No subject)"}
              </p>
            </div>

            {/* Date & Time Selectors */}
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => {
                      setScheduledDate(e.target.value);
                      setSelectedQuick(null);
                    }}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#000640] focus:ring-2 focus:ring-[#17A2B8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => {
                      setScheduledTime(e.target.value);
                      setSelectedQuick(null);
                    }}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#000640] focus:ring-2 focus:ring-[#17A2B8] outline-none"
                  />
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Quick Select</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleQuickSelect(opt)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        selectedQuick === opt.label
                          ? "bg-[#4460EF] text-white border-[#4460EF] shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-400"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Notice */}
              <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-center gap-2.5 text-xs text-[#4460EF] font-medium">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>Will be delivered to <strong className="font-bold text-[#000640]">{recipientsCount} members</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 bg-[#4460EF] hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <Clock className="w-4 h-4" />
                <span>Confirm Schedule</span>
              </button>
            </div>
          </>
        ) : (
          /* Scheduled Confirm Screen */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#4460EF] text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
              <Clock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#000640]">Email Scheduled!</h3>
              <p className="text-xs text-gray-500 mt-1">
                Your email will be sent to <strong className="font-bold text-[#000640]">{recipientsCount} members</strong> on
              </p>
            </div>

            <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-100 inline-flex items-center gap-2 text-sm font-semibold text-[#4460EF]">
              <Calendar className="w-4 h-4" />
              <span>{formattedScheduleText}</span>
            </div>

            <div>
              <button
                onClick={handleDone}
                className="w-full py-3 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
