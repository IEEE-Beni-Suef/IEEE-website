import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, FolderPlus } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  category?: { id: number; name: string; description?: string } | null;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  category,
}: CategoryFormModalProps) {
  const { isDark } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        name: category?.name || "",
        description: category?.description || "",
      });
    }
  }, [isOpen, category, reset]);

  const onFormSubmit = async (data: CategoryFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#253047]">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#5A10A5] dark:text-purple-400" />
            <h3 className="text-base font-extrabold tracking-tight">
              {category ? "Edit Category" : "Create Category"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Technical, Research, Community..."
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                  : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5]"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              {...register("description")}
              placeholder="Enter category description..."
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none resize-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                  : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5]"
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-[#253047]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182033]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#5A10A5] hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : category
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
