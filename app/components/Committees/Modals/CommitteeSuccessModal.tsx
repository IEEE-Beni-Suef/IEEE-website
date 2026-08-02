import React from "react";
import { X, CheckSquare } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface CommitteeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  variant?: "purple" | "blue" | "green";
}

export const CommitteeSuccessModal: React.FC<CommitteeSuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "Done",
  variant = "blue",
}) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const iconBgClass =
    variant === "green"
      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
      : variant === "purple"
      ? "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
      : "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400";

  const btnBgClass =
    variant === "green"
      ? "bg-emerald-600 hover:bg-emerald-700"
      : variant === "purple"
      ? "bg-[#5A10A5] hover:bg-[#4A0D88]"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div
        className={`w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border transition-all ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-[#EEF0FF] text-[#000640]"
        }`}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? "hover:bg-[#1E2738] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-3">
          <div className={`w-16 h-16 rounded-2xl ${iconBgClass} flex items-center justify-center mx-auto mb-4`}>
            <CheckSquare className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-extrabold mb-1">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 px-4 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl ${btnBgClass} text-white font-bold text-xs transition-colors shadow-md`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitteeSuccessModal;
