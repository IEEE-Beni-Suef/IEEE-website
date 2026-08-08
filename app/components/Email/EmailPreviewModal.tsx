import React from "react";
import { X, Send, Edit3, Users, Clock, Paperclip } from "lucide-react";

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  body: string;
  recipientsCount: number;
  onSend: () => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  subject,
  body,
  recipientsCount,
  onSend,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-[#000640]">Email Preview</h3>
            <p className="text-xs text-gray-500">Review before sending</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-5 overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Subject Container */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Subject</p>
            <p className="text-base font-bold text-[#000640]">
              {subject && subject.trim() ? subject : "(No Subject)"}
            </p>
          </div>

          {/* Message Preview */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 min-h-[160px]">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Body Preview</p>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {body && body.trim() ? body : "No content provided yet..."}
            </div>
          </div>

          {/* Meta Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#5A10A5]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Recipients</p>
                <p className="text-sm font-bold text-[#000640]">{recipientsCount} Members</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#17A2B8]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Est. Delivery</p>
                <p className="text-sm font-bold text-[#000640]">≈ 2 minutes</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-[#FFC107]">
              <Paperclip className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Attachments</p>
              <p className="text-sm font-bold text-[#000640]">None attached</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer text-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onSend();
            }}
            className="px-6 py-2.5 bg-[#5A10A5] hover:bg-[#4a0d88] text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};
