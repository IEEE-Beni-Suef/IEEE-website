import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import type { Category } from "~/types/index";
import { useTheme } from "~/hooks/useTheme";

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
  const { isDark } = useTheme();
  const [keywords, setKeywords] = useState<string[]>(article?.keywords || []);
  const [keywordInput, setKeywordInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(article?.photo || null);

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
      setPreviewUrl(article?.photo || null);
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
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = async (data: ArticleFormData, status: string = "Published") => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      formData.append("status", status);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          isDark
            ? "bg-[#101726] border-[#232D42] text-white"
            : "bg-white border-purple-100 text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#253047]">
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">
              {article ? "Edit Article" : "Create New Article"}
            </h3>
            <p className="text-xs text-gray-400">
              Publish news, guides, or technical articles for IEEE members.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit((d) => onFormSubmit(d, "Published"))}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
        >
          {/* Cover Image Upload Area (Matching FormPanel mock) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Cover Image
            </label>
            <div
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDark
                  ? "border-[#253047] bg-[#182033]/50 hover:bg-[#182033]"
                  : "border-purple-200 bg-purple-50/30 hover:bg-purple-50"
              }`}
            >
              {previewUrl ? (
                <div className="relative group w-full h-40 rounded-xl overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-gray-900 cursor-pointer">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-200">
                      Drag & Drop image here
                    </p>
                    <p className="text-[11px] text-gray-400">
                      PNG, JPG, or WEBP up to 5MB
                    </p>
                  </div>
                  <label className="inline-block px-4 py-1.5 rounded-xl text-xs font-bold bg-[#5A10A5] text-white cursor-pointer hover:bg-purple-700">
                    Browse File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="e.g., Cybersecurity Essentials for IEEE Members"
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                  : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5] focus:bg-white"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Short Description *
            </label>
            <textarea
              rows={3}
              {...register("description")}
              placeholder="Provide a brief summary of what readers will learn..."
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none resize-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                  : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5] focus:bg-white"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Category *
            </label>
            <select
              {...register("categoryId")}
              disabled={categoriesLoading}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-medium border outline-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                  : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5] focus:bg-white"
              }`}
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-rose-500 mt-1 font-medium">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Keywords Tag Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
              Keywords & Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={handleKeywordKeyPress}
                placeholder="Type tag & press Enter"
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-medium border outline-none ${
                  isDark
                    ? "bg-[#182033] border-[#253047] text-white focus:border-purple-500"
                    : "bg-gray-50/80 border-gray-200 text-gray-900 focus:border-[#5A10A5]"
                }`}
              />
              <button
                type="button"
                onClick={addKeyword}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-[#5A10A5] text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300"
                  >
                    #{kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      className="ml-1.5 text-purple-600 hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-[#253047]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-[#253047] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#182033]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit((d) => onFormSubmit(d, "Draft"))}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-purple-200 dark:border-purple-900 text-[#5A10A5] dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#5A10A5] hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : article
                ? "Save Changes"
                : "Publish / Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
