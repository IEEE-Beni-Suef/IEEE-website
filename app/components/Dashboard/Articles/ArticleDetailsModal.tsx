import React, { useState } from "react";
import { Button } from "~/components/ui/Button";
import { FormInput } from "~/components/form";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface SubsectionFormData {
  subtitle: string;
  paragraph: string;
  photo?: FileList;
}

interface ArticleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  detailedArticle: any;
  detailsLoading: boolean;
  subsectionActionLoadingId: number | null;
  onCreateSubsection: (data: FormData) => void;
  onUpdateSubsection: (data: FormData) => void;
  onDeleteSubsection: (id: number) => void;
  getCategoryName: (categoryId: number) => string;
  editingSubsection: any;
  setEditingSubsection: (subsection: any) => void;
}

export function ArticleDetailsModal({
  isOpen,
  onClose,
  article,
  detailedArticle,
  detailsLoading,
  subsectionActionLoadingId,
  onCreateSubsection,
  onUpdateSubsection,
  onDeleteSubsection,
  getCategoryName,
  editingSubsection,
  setEditingSubsection,
}: ArticleDetailsModalProps) {
  const [isAddingSubsection, setIsAddingSubsection] = useState(false);

  const {
    register: registerNew,
    handleSubmit: handleSubmitNew,
    reset: resetNew,
    formState: { errors: errorsNew },
  } = useForm<SubsectionFormData>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<SubsectionFormData>();

  const handleCreateSubsectionClick = () => {
    setIsAddingSubsection(true);
    resetNew({
      subtitle: "",
      paragraph: "",
    });
  };

  const handleEditSubsectionClick = (subsection: any) => {
    setEditingSubsection(subsection);
    resetEdit({
      subtitle: subsection.subtitle,
      paragraph: subsection.paragraph,
    });
  };

  const handleCancelEdit = () => {
    setEditingSubsection(null);
    setIsAddingSubsection(false);
    resetNew();
    resetEdit();
  };

  const onSubmitNew = async (data: SubsectionFormData) => {
    const formData = new FormData();
    formData.append("subtitle", data.subtitle);
    formData.append("paragraph", data.paragraph);
    formData.append("articleId", article.id.toString());

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    await onCreateSubsection(formData);
    setIsAddingSubsection(false);
    resetNew();
  };

  const onSubmitEdit = async (data: SubsectionFormData) => {
    const formData = new FormData();
    formData.append("id", editingSubsection.id.toString());
    formData.append("subtitle", data.subtitle);
    formData.append("paragraph", data.paragraph);
    formData.append("articleId", article.id.toString());

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    await onUpdateSubsection(formData);
    setEditingSubsection(null);
    resetEdit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Article Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {detailsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading article details...</span>
              </div>
            </div>
          ) : detailedArticle ? (
            <>
              {/* Article Image */}
              {detailedArticle.photo && (
                <div className="w-full">
                  <img
                    src={detailedArticle.photo}
                    alt={detailedArticle.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Article Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {detailedArticle.title}
                  </h4>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {getCategoryName(detailedArticle.category.categoryId)}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Description
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {detailedArticle.description}
                  </p>
                </div>

                {detailedArticle.keywords &&
                  detailedArticle.keywords.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Keywords
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {detailedArticle.keywords.map(
                          (keyword: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                            >
                              {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Subsections */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-medium text-gray-900 dark:text-white">
                      Subsections
                    </h5>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleCreateSubsectionClick}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subsection
                    </Button>
                  </div>

                  {/* Add New Subsection Form */}
                  {isAddingSubsection && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Add New Subsection
                      </h6>
                      <form
                        onSubmit={handleSubmitNew(onSubmitNew)}
                        className="space-y-4"
                      >
                        <FormInput
                          id="subtitle"
                          label="Subtitle"
                          placeholder="Enter subsection subtitle"
                          register={registerNew}
                          error={errorsNew.subtitle}
                        />
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Content
                          </label>
                          <textarea
                            {...registerNew("paragraph", {
                              required: "Content is required",
                            })}
                            placeholder="Enter subsection content"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                          {errorsNew.paragraph && (
                            <p className="text-sm text-red-600">
                              {errorsNew.paragraph.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Photo (Optional)
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            {...registerNew("photo")}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" variant="primary" size="sm">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Existing Subsections */}
                  {detailedArticle.subsections &&
                  detailedArticle.subsections.length > 0 ? (
                    <div className="space-y-4">
                      {detailedArticle.subsections.map((subsection: any) => (
                        <div
                          key={subsection.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          {editingSubsection?.id === subsection.id ? (
                            <form
                              onSubmit={handleSubmitEdit(onSubmitEdit)}
                              className="space-y-4"
                            >
                              <FormInput
                                id="subtitle"
                                label="Subtitle"
                                placeholder="Enter subsection subtitle"
                                register={registerEdit}
                                error={errorsEdit.subtitle}
                              />
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Content
                                </label>
                                <textarea
                                  {...registerEdit("paragraph", {
                                    required: "Content is required",
                                  })}
                                  placeholder="Enter subsection content"
                                  rows={3}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                {errorsEdit.paragraph && (
                                  <p className="text-sm text-red-600">
                                    {errorsEdit.paragraph.message}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Photo (Optional)
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  {...registerEdit("photo")}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="submit"
                                  variant="primary"
                                  size="sm"
                                >
                                  <Save className="w-4 h-4 mr-1" />
                                  Save
                                </Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div className="flex items-start justify-between mb-3">
                                <h6 className="text-lg font-medium text-gray-900 dark:text-white">
                                  {subsection.subtitle}
                                </h6>
                                <div className="flex gap-2">
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() =>
                                      handleEditSubsectionClick(subsection)
                                    }
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                      onDeleteSubsection(subsection.id)
                                    }
                                    disabled={
                                      subsectionActionLoadingId ===
                                      subsection.id
                                    }
                                  >
                                    {subsectionActionLoadingId ===
                                    subsection.id ? (
                                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Trash2 className="w-3 h-3" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                              {subsection.photo && (
                                <img
                                  src={subsection.photo}
                                  alt={subsection.subtitle}
                                  className="w-full h-48 object-cover rounded-lg mb-3"
                                />
                              )}
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {subsection.paragraph}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    !isAddingSubsection && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          No subsections found
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                          Add a subsection to get started
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Failed to load article details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
