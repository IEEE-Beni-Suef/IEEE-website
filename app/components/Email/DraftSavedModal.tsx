import React from "react";
import { X, CheckCircle2, Bookmark } from "lucide-react";

interface DraftSavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  recipientsCount: number;
  lastSavedTime: string;
  onContinueEditing?: () => void;
}

export const DraftSavedModal: React.FC<DraftSavedModalProps> = ({
  isOpen,
  onClose,
  subject,
  recipientsCount,
  lastSavedTime,
  onContinueEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#5A10A5]">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#000640]">Draft Saved</h3>
              <p className="text-xs text-gray-500">You can resume this email anytime</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Draft saved successfully</p>
              <p className="text-xs text-emerald-600">{lastSavedTime}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Subject</p>
              <p className="text-sm font-semibold text-[#000640]">
                {subject && subject.trim() ? subject : "(No Subject)"}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
              <p className="font-bold text-gray-400 uppercase tracking-wider mb-2">Draft Info</p>
              <div className="flex justify-between text-gray-600">
                <span>Status</span>
                <span className="font-semibold text-[#5A10A5]">Saved as Draft</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Recipients</span>
                <span className="font-semibold text-[#000640]">{recipientsCount} Members</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Attachments</span>
                <span className="font-medium">None</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Last saved</span>
                <span className="font-medium">{lastSavedTime.split(" - ").pop() || "Just now"}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500">
            Find this draft in <span className="font-semibold text-[#5A10A5]">Drafts (5)</span> in top cards.
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <button
            onClick={onContinueEditing || onClose}
            className="w-full py-3 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Editing</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all cursor-pointer text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
