import React, { type FC, useState } from "react";
import type {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, X } from "lucide-react";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  id: string;
  label: string;
  options: MultiSelectOption[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  error?: FieldError | FieldErrors;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
}

export const FormMultiSelect: FC<FormMultiSelectProps> = ({
  id,
  label,
  options = [],
  register,
  setValue,
  watch,
  error,
  icon: Icon,
  placeholder = "Select options",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValues = watch(id) || [];

  const toggleOption = (value: string) => {
    const currentValues = selectedValues;
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];

    setValue(id, newValues);
  };
  const removeOption = (value: string) => {
    const newValues = selectedValues.filter((v: string) => v !== value);
    setValue(id, newValues);
  };

  const getSelectedLabels = () => {
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);
  };

  console.log(getSelectedLabels());

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      {/* Hidden input for form registration */}
      <input
        type="hidden"
        {...register(id)}
        value={JSON.stringify(selectedValues)}
      />

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
        )}

        {/* Main select button */}
        <div
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
        >
          <div className="flex flex-wrap gap-1">
            {selectedValues.length === 0 ? (
              <span className="text-gray-500 dark:text-gray-400">
                {placeholder}
              </span>
            ) : (
              getSelectedLabels().map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const option = options.find((opt) => opt.label === label);
                      if (option) removeOption(option.value);
                    }}
                    className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {/* Options dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  selectedValues.includes(option.value)
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <span className="text-blue-500">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600">
            {typeof error === "object" && error && "message" in error
              ? String(error.message)
              : "Invalid selection"}
          </p>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
