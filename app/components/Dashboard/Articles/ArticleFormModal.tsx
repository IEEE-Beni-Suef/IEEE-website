import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "~/components/Modal";
import { FormInput, FormSelect } from "~/components/form";
import { Button } from "~/components/ui/Button";
import { X, Plus } from "lucide-react";
import type { Category } from "~/types/index";

const articleFormSchema = z.object({
  title: z.string().min(1, "Article title is required"),
  description: z.string().min(1, "Article description is required"),
  categoryId: z.string().min(1, "Category is required"),
  photo: z.any().optional(),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  article?: any;
  categories?: Category[];
  categoriesLoading?: boolean;
}

export function ArticleFormModal({
  isOpen,
  onClose,
  onSubmit,
  article,
  categories = [],
  categoriesLoading = false,
}: ArticleFormModalProps) {
  const [keywords, setKeywords] = useState<string[]>(article?.keywords || []);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: article?.title || "",
      description: article?.description || "",
      categoryId: article?.categoryId?.toString() || "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        title: article?.title || "",
        description: article?.description || "",
        categoryId: article?.categoryId?.toString() || "",
      });
      setKeywords(article?.keywords || []);
      setSelectedFile(null);
    }
  }, [isOpen, article, reset]);

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onFormSubmit = async (data: ArticleFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      formData.append("keywords", keywords.join(","));

      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      await onSubmit(formData);
      reset();
      setKeywords([]);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={article ? "Edit Article" : "Create Article"}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <FormInput
          id="title"
          label="Title"
          placeholder="Enter article title"
          register={register}
          error={errors.title}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter article description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <FormSelect
          id="categoryId"
          label="Category"
          register={register}
          error={errors.categoryId}
          options={categoryOptions}
          placeholder={
            categoriesLoading ? "Loading categories..." : "Select category"
          }
          disabled={categoriesLoading}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"
          />
          {selectedFile && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Selected: {selectedFile.name}
            </p>
          )}
          {article?.photo && !selectedFile && (
            <div className="mt-2">
              <img
                src={article.photo}
                alt="Current article"
                className="w-32 h-20 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Keywords
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={handleKeywordKeyPress}
              placeholder="Add keyword and press Enter"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button type="button" variant="secondary" onClick={addKeyword}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
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
              : article
                ? "Update Article"
                : "Create Article"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
