import React, { type FC, type ReactNode } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  icon?: LucideIcon;
  rightElement?: ReactNode;
  className?: string;
}

export const FormInput: FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  icon: Icon,
  rightElement,
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
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          id={id}
          type={type}
          {...register(id)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"} py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
          placeholder={placeholder}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  );
};
