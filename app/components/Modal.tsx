import { type FC, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  description?: string;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center ">
        <div className="fixed inset-0 bg-gray-200/70" onClick={onClose}></div>

        <div className="inline-block w-full z-20 max-w-md bg-opacity-25 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col space-y-1.5">
              {" "}
              <h3 className="text-lg font-bold leading-6 text-[#000640] capitalize">
                {title}
              </h3>
              {description && (
                <p className="text-[#6C757D] text-[12px]">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[#6C757D] cursor-pointer hover:text-[#596167]"
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
