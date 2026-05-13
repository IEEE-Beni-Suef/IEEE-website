import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "~/components/Modal";
import { FormInput } from "~/components/form";
import { Button } from "~/components/ui/Button";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <FormInput
          id="name"
          label="Category Name"
          placeholder="Enter category name"
          register={register}
          error={errors.name}
        />

        <FormInput
          id="description"
          label="Description (Optional)"
          placeholder="Enter category description"
          register={register}
          error={errors.description}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : category
                ? "Update Category"
                : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
