import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "~/components/Modal";
import { FormInput } from "~/components/form";
import { Button } from "~/components/ui/Button";
import type { ISponsorCard } from "~/types";

const sponsorFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type SponsorFormData = z.infer<typeof sponsorFormSchema>;

interface SponsorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  sponsor?: ISponsorCard | null;
}

export function SponsorFormModal({
  isOpen,
  onClose,
  onSubmit,
  sponsor,
}: SponsorFormModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      title: sponsor?.title || "",
      description: sponsor?.description || "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        title: sponsor?.title || "",
        description: sponsor?.description || "",
      });
      setSelectedFile(null);
    }
  }, [isOpen, sponsor, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onFormSubmit = async (data: SponsorFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      if (selectedFile) {
        // Appending as "img" since the interface expects "img", but backend may expect "photo" or "file". 
        // We will use "photo" to be consistent with Article, but if it fails, we can adjust it.
        formData.append("photo", selectedFile);
      }

      await onSubmit(formData);
      reset();
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sponsor ? "Edit Sponsor" : "Add Sponsor"}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <FormInput
          id="title"
          label="Sponsor Name / Title"
          placeholder="Enter sponsor title"
          register={register}
          error={errors.title}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter sponsor description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Sponsor Logo / Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="text-sm text-green-600">
              Selected: {selectedFile.name}
            </p>
          )}
          {sponsor?.img && !selectedFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Current Image:</p>
              <img
                src={sponsor.img}
                alt="Current sponsor"
                className="w-32 h-32 object-contain rounded bg-gray-50 border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : sponsor
                ? "Update Sponsor"
                : "Add Sponsor"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
