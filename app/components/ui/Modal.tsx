import { type FC, type ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
}

const sizeToMaxWidth: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children, size = "lg" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-900/60" onClick={onClose} />

        <div className={`inline-block w-full z-20 ${sizeToMaxWidth[size]} p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl`}>
          <div className="flex items-center justify-between mb-4">
            {title ? (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;


