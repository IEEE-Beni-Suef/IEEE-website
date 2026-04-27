import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Button } from "./ui/Button";
import { articleSchema } from "~/utils/schemas";
import type { z } from "zod";
import type { Category } from "~/types/index";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof articleSchema> | FormData) => void;
  article?: any;
  categories?: Category[];
  categoriesLoading?: boolean;
}

export function ArticleModal({
  isOpen,
  onClose,
  onSubmit,
  article,
  categories = [],
  categoriesLoading = false,
}: ArticleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: [] as string[],
    photo: "",
    categoryId: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        description: article.description || "",
        keywords: article.keywords || [],
        photo: article.photo || "",
        categoryId: article.categoryId?.toString() || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        keywords: [],
        photo: "",
        categoryId: "",
      });
    }
    setSelectedFile(null);
    setKeywordInput("");
    setErrors({});
  }, [article, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (errors.photo) {
        setErrors((prev) => ({ ...prev, photo: "" }));
      }
    }
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords.includes(keywordInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
      if (errors.keywords) {
        setErrors((prev) => ({ ...prev, keywords: "" }));
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((keyword) => keyword !== keywordToRemove),
    }));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("keywords", formData.keywords.join(","));
      submitData.append("categoryId", formData.categoryId);
      if (selectedFile) {
        submitData.append("photo", selectedFile);
      } else if (formData.photo && !article) {
        throw new Error("Photo is required");
      }

      onSubmit(submitData);
    } catch (error: any) {
      if (error?.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else if (error.message) {
        setErrors({ photo: error.message });
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={article ? "Edit Article" : "Create Article"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter article title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter article description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Photo <span className="text-red-500">*</span>
          </label>

          {/* File Upload Option */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Upload Image File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200 dark:hover:file:bg-blue-800"
              />
              {selectedFile && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div>{formData.photo && <img src={formData.photo} />}</div>
          </div>

          {errors.photo && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.photo}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
            disabled={categoriesLoading}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {categoriesLoading ? "Loading categories..." : "Select category"}
            </option>
            {!categoriesLoading &&
              categories.map((category: Category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
          </select>
          {errors.categoryId && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.categoryId}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Keywords <span className="text-red-500">*</span>
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
              Add
            </Button>
          </div>

          {formData.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.keywords.map((keyword, index) => (
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
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {errors.keywords && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.keywords}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {article ? "Update Article" : "Create Article"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
