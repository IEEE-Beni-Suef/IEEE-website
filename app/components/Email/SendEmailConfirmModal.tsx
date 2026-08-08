import React, { useState } from "react";
import { X, Send, AlertTriangle, Users, Clock, Paperclip, CheckCircle2, Rocket } from "lucide-react";

interface SendEmailConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  body: string;
  recipientsCount: number;
  isSending: boolean;
  onConfirmSend: () => void;
}

export const SendEmailConfirmModal: React.FC<SendEmailConfirmModalProps> = ({
  isOpen,
  onClose,
  subject,
  body,
  recipientsCount,
  isSending,
  onConfirmSend,
}) => {
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    onConfirmSend();
    setIsSentSuccess(true);
  };

  const handleDone = () => {
    setIsSentSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        {!isSentSuccess ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#5A10A5]">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#000640]">Confirm & Send</h3>
                  <p className="text-xs text-gray-500">Review your email before it goes out</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Box */}
            <div className="mt-4 space-y-3">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Subject</p>
                <p className="text-sm font-bold text-[#000640] truncate">
                  {subject && subject.trim() ? subject : "(No subject)"}
                </p>
              </div>

              {/* Message Body Excerpt */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 max-h-24 overflow-y-auto">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Message Preview</p>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {body && body.trim() ? body : "(No content)"}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400 font-medium">Recipients</p>
                  <p className="text-xs font-bold text-[#000640]">{recipientsCount} Members</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Clock className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400 font-medium">Est. Delivery</p>
                  <p className="text-xs font-bold text-[#000640]">≈ 2 min</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Paperclip className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400 font-medium">Attachments</p>
                  <p className="text-xs font-bold text-[#000640]">None</p>
                </div>
              </div>

              {/* Amber Warning Banner */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex gap-2.5 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p>
                  This action cannot be undone. The email will be sent immediately to all selected recipients.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="px-6 py-2.5 bg-[#5A10A5] hover:bg-[#4a0d88] disabled:bg-purple-300 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "Sending..." : `Send to ${recipientsCount} Members`}</span>
              </button>
            </div>
          </>
        ) : (
          /* Email Sent Success Screen */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#5A10A5] flex items-center justify-center mx-auto shadow-md">
              <Rocket className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#000640]">Email Sent!</h3>
              <p className="text-xs text-gray-500 mt-1">
                Your message was successfully delivered to <strong className="font-bold text-[#000640]">{recipientsCount} members</strong>
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-base font-extrabold text-[#000640]">{recipientsCount}</p>
                <p className="text-[10px] text-gray-400">Delivered</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-base font-extrabold text-[#000640]">~{Math.round(recipientsCount * 0.82)}</p>
                <p className="text-[10px] text-gray-400">Est. Opens</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-base font-extrabold text-[#000640]">≈ 2 min</p>
                <p className="text-[10px] text-gray-400">Delivery</p>
              </div>
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
