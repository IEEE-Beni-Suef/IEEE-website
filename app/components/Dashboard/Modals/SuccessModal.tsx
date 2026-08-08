import React from "react";
import { Check } from "lucide-react";
import type { SuccessModalProps } from "~/types/dashboard";

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  buttonText,
  onButtonClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Green Checkmark Circle */}
        <div className="w-24 h-24 rounded-full border-4 border-emerald-600 flex items-center justify-center mb-6">
          <Check className="w-12 h-12 text-emerald-600 stroke-[3]" />
        </div>

        {/* Message Title */}
        <h3 className="text-xl font-bold text-[#000640] dark:text-white max-w-xs leading-snug mb-8">
          {title}
        </h3>

        {/* Action Button */}
        <button
          onClick={() => {
            onButtonClick();
            onClose();
          }}
          className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
