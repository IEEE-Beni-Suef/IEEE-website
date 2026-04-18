import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./ui/Button";
import { createCategorySchema } from "~/utils/schemas";
import type { CreateCategoryFormData } from "~/utils/schemas";
import type { ApiCategory } from "~/types/api.types";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with validated form data on submit */
  onSubmit: (data: CreateCategoryFormData) => void;
  /** Pass an existing category to switch to "edit" mode */
  category?: ApiCategory | null;
  isLoading?: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  isLoading = false,
}: CategoryModalProps) {
  const [formData, setFormData] = useState<CreateCategoryFormData>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description ?? "",
      });
    } else {
      setFormData({ name: "", description: "" });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleChange = (field: keyof CreateCategoryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createCategorySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Workshops"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="category-description"
            value={formData.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="A short description of this category…"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Saving…" : category ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
