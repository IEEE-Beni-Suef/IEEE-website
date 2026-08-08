import React from "react";
import { Save, Eye, Clock, Send } from "lucide-react";

interface EmailBottomActionBarProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onPreview: () => void;
  onSchedule: () => void;
  onSendEmail: () => void;
}

export const EmailBottomActionBar: React.FC<EmailBottomActionBarProps> = ({
  onCancel,
  onSaveDraft,
  onPreview,
  onSchedule,
  onSendEmail,
}) => {
  return (
    <div className="sticky bottom-4 z-40 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-xl flex flex-wrap items-center justify-between gap-3">
      <button
        onClick={onCancel}
        className="px-5 py-2.5 border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs transition-all cursor-pointer"
      >
        Cancel
      </button>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={onSaveDraft}
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5 text-[#5A10A5]" />
          <span>Save Draft</span>
        </button>

        <button
          onClick={onPreview}
          className="px-4 py-2.5 border border-[#4460EF] text-[#4460EF] hover:bg-indigo-50 font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>

        <button
          onClick={onSchedule}
          className="px-4 py-2.5 border border-[#17A2B8] text-[#17A2B8] hover:bg-cyan-50 font-semibold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Schedule</span>
        </button>

        <button
          onClick={onSendEmail}
          className="px-6 py-2.5 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 hover:shadow-lg"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send Email</span>
        </button>
      </div>
    </div>
  );
};
