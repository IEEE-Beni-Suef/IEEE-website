import React, { type FC } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
}

export const FormSelect: FC<FormSelectProps> = ({
  id,
  label,
  options,
  register,
  error,
  icon: Icon,
  placeholder = "Select an option",
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
        <select
          id={id}
          {...register(id)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  );
};
