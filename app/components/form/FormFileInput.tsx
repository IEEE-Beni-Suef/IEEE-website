import React, { type FC, type ChangeEvent } from "react";
import type {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { LucideIcon } from "lucide-react";

interface FormFileInputProps {
  id: string;
  label: string;
  accept?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: FieldError;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
}

export const FormFileInput: FC<FormFileInputProps> = ({
  id,
  label,
  accept = "image/*",
  register,
  setValue,
  watch,
  error,
  icon: Icon,
  placeholder = "Choose file...",
  className = "",
}) => {
  const watchedFile = watch(id);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(id, file);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor={id}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 cursor-pointer flex items-center ${className}`}
        >
          {watchedFile ? watchedFile.name : placeholder}
        </label>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
