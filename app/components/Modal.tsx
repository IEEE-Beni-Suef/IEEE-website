import { type FC, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center ">
        <div
          className="fixed inset-0 bg-gray-200/70 dark:bg-gray-800/70"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full z-20 max-w-md bg-opacity-25 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-red-400 cursor-pointer hover:text-red-600 dark:hover:text-red-300"
            >
              <span className="sr-only">Close</span>✕
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
