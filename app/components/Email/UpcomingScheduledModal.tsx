import React, { useState } from "react";
import { X, Clock, Edit3, Send, Trash2, CheckCircle2 } from "lucide-react";

interface ScheduledEmailItem {
  id: number;
  subject: string;
  body: string;
  scheduledTime: string;
  recipientsText: string;
  memberCount: number;
  location?: string;
  dateStr?: string;
  timeStr?: string;
}

interface UpcomingScheduledModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditInCompose?: (item: ScheduledEmailItem) => void;
  onSendNow?: (item: ScheduledEmailItem) => void;
}

export const UpcomingScheduledModal: React.FC<UpcomingScheduledModalProps> = ({
  isOpen,
  onClose,
  onEditInCompose,
  onSendNow,
}) => {
  const [scheduledList, setScheduledList] = useState<ScheduledEmailItem[]>([]);

  const [selectedId, setSelectedId] = useState<number>(101);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deletedSubject, setDeletedSubject] = useState("");

  if (!isOpen) return null;

  const currentItem = scheduledList.find((i) => i.id === selectedId) || scheduledList[0];

  const handleDelete = () => {
    if (!currentItem) return;
    setDeletedSubject(currentItem.subject);
    setScheduledList((prev) => prev.filter((i) => i.id !== currentItem.id));
    setIsDeleted(true);
  };

  const handleDoneDeleted = () => {
    setIsDeleted(false);
    if (scheduledList.length === 0) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col">
        {!isDeleted ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#000640]">Upcoming Scheduled Emails</h3>
                <p className="text-xs text-gray-500">
                  {scheduledList.length} emails queued for automated delivery
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Tabs if multiple */}
            {scheduledList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-3 custom-scrollbar">
                {scheduledList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      item.id === currentItem?.id
                        ? "bg-[#5A10A5] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {item.subject.slice(0, 25)}...
                  </button>
                ))}
              </div>
            )}

            {currentItem ? (
              <div className="my-4 overflow-y-auto space-y-4 pr-1 flex-1">
                {/* Scheduled Time Pill Banner */}
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 flex items-center gap-2.5 text-xs text-[#4460EF] font-semibold">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Scheduled for {currentItem.scheduledTime}</span>
                </div>

                {/* Subject Box */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Subject</p>
                  <p className="text-sm font-bold text-[#000640]">{currentItem.subject}</p>
                </div>

                {/* Body Preview */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Body Preview</p>
                  <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                    {currentItem.body}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-gray-400 font-medium mb-0.5">Recipients</p>
                    <p className="font-bold text-[#000640]">{currentItem.recipientsText}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-gray-400 font-medium mb-0.5">Member Count</p>
                    <p className="font-bold text-[#000640]">{currentItem.memberCount} Members</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
                  <p className="text-gray-400 font-medium mb-0.5">Attachments</p>
                  <p className="font-bold text-[#000640]">None attached</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        if (onEditInCompose) onEditInCompose(currentItem);
                        onClose();
                      }}
                      className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-purple-600" />
                      <span>Edit in Compose</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onSendNow) onSendNow(currentItem);
                        onClose();
                      }}
                      className="py-2.5 px-4 bg-[#4460EF] hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Now</span>
                    </button>
                  </div>

                  <button
                    onClick={handleDelete}
                    className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Scheduled Email</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No scheduled emails found.
              </div>
            )}
          </>
        ) : (
          /* Deleted Message Screen */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#000640]">Email Deleted</h3>
              <p className="text-xs text-gray-500 mt-1">
                "{deletedSubject}" has been removed.
              </p>
            </div>

            <button
              onClick={handleDoneDeleted}
              className="w-full py-3 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Done</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
