import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl transition-colors duration-200 ${
          isDark ? "bg-[#101726] text-white border border-[#232D42]" : "bg-white text-[#000640]"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {message && (
          <p className={`text-sm mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#5A10A5] hover:bg-[#4A0D88] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
