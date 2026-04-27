import React, { type FC } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  icon?: LucideIcon;
  rows?: number;
  className?: string;
}

export const FormTextarea: FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  register,
  error,
  icon: Icon,
  rows = 4,
  className = "",
}) => {
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
          <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        )}
        <textarea
          id={id}
          rows={rows}
          {...register(id)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical ${className}`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
