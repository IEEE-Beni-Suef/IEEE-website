import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/Button";
import { ContentStats } from "~/components/Dashboard/Articles/ContentStats";
import { ContentTabs } from "~/components/Dashboard/Articles/ContentTabs";
import { ArticleFilters } from "~/components/Dashboard/Articles/ArticleFilters";
import { ArticlesList } from "~/components/Dashboard/Articles/ArticlesList";
import { CategoriesList } from "~/components/Dashboard/Articles/CategoriesList";
import { ArticleFormModal } from "~/components/Dashboard/Articles/ArticleFormModal";
import { CategoryFormModal } from "~/components/Dashboard/Articles/CategoryFormModal";
import { ArticleDetailsModal } from "~/components/Dashboard/Articles/ArticleDetailsModal";
import { useArticleManagement } from "~/hooks/useArticleManagement";
import { useCategoryManagement } from "~/hooks/useCategoryManagement";
import { useSubsectionManagement } from "~/hooks/useSubsectionManagement";
import type { Category } from "~/types/index";

// Import your API hooks (these should already exist)
import {
  useAllArticles,
  useAllCategories,
  useDeleteArticle,
  useCreateArticle,
  useUpdateArticle,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useGetArticleSubsection,
  useCreateSubsection,
  useUpdateSubsection,
  useDeleteSubsection,
} from "~/hooks/useApi";

const ArticlesManagement = () => {
  const queryClient = useQueryClient();

  // Tab state
  const [activeTab, setActiveTab] = useState<"articles" | "categories">(
    "articles"
  );
  const [editingSubsection, setEditingSubsection] = useState<any>(null);

  // API hooks
  const { data, isLoading, isError, error } = useAllArticles();
  const { data: categories, isLoading: categoriesLoading } = useAllCategories();
  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: createArticle } = useCreateArticle();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  // Custom hooks for state management
  const articleManagement = useArticleManagement();
  const categoryManagement = useCategoryManagement();
  const subsectionManagement = useSubsectionManagement();

  // Create update mutations
  const { mutate: updateArticle } = useUpdateArticle(
    articleManagement.editingArticle?.id || 0
  );
  const { mutate: updateCategory } = useUpdateCategory(
    categoryManagement.editingCategory?.id || 0
  );
  const { mutate: createSubsection } = useCreateSubsection();
  const { mutate: updateSubsection } = useUpdateSubsection(
    editingSubsection?.id || 0
  );
  const { mutate: deleteSubsection } = useDeleteSubsection();

  // Fetch detailed article data when viewing details
  const { data: detailedArticle, isLoading: detailsLoading } =
    useGetArticleSubsection(articleManagement.selectedArticleId || 0);

  // Utility function
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find((cat: Category) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Article handlers
  const handleDeleteArticle = (id: number) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    articleManagement.setActionLoading(id);
    deleteArticle(id, {
      onSuccess: () => {
        toast.success("Article deleted successfully!");
        articleManagement.invalidateArticles();
        articleManagement.setActionLoading(null);
      },
      onError: (error) => {
        toast.error((error as Error).message);
        articleManagement.setActionLoading(null);
      },
    });
  };

  const handleSubmitArticle = (data: FormData) => {
    if (articleManagement.editingArticle) {
      updateArticle(data, {
        onSuccess: () => {
          toast.success("Article updated successfully!");
          articleManagement.handleCloseModal();
          articleManagement.invalidateArticles();
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      });
    } else {
      createArticle(data, {
        onSuccess: () => {
          toast.success("Article created successfully!");
          articleManagement.handleCloseModal();
          articleManagement.invalidateArticles();
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      });
    }
  };

  // Category handlers
  const handleSubmitCategory = (data: any) => {
    if (categoryManagement.editingCategory) {
      updateCategory(data, {
        onSuccess: () => {
          toast.success("Category updated successfully!");
          categoryManagement.handleCloseCategoryModal();
          categoryManagement.invalidateCategories();
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      });
    } else {
      createCategory(data, {
        onSuccess: () => {
          toast.success("Category created successfully!");
          categoryManagement.handleCloseCategoryModal();
          categoryManagement.invalidateCategories();
        },
        onError: (error) => {
          toast.error((error as Error).message);
        },
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    )
      return;

    categoryManagement.setCategoryActionLoading(id);
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully!");
        categoryManagement.invalidateCategories();
        categoryManagement.setCategoryActionLoading(null);
      },
      onError: (error) => {
        toast.error((error as Error).message);
        categoryManagement.setCategoryActionLoading(null);
      },
    });
  };

  // Subsection handlers
  const handleCreateSubsection = (data: FormData) => {
    createSubsection(data, {
      onSuccess: () => {
        toast.success("Subsection added successfully!");
        subsectionManagement.invalidateSubsections();
        queryClient.invalidateQueries({
          queryKey: ["articleDetails", articleManagement.selectedArticleId],
        });
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  const handleUpdateSubsection = (data: FormData) => {
    updateSubsection(data, {
      onSuccess: () => {
        toast.success("Subsection updated successfully!");
        subsectionManagement.invalidateSubsections();
        setEditingSubsection(null);
        queryClient.invalidateQueries({
          queryKey: ["articleDetails", articleManagement.selectedArticleId],
        });
      },
      onError: (error) => {
        toast.error((error as Error).message);
      },
    });
  };

  const handleDeleteSubsection = (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this subsection? This action cannot be undone."
      )
    )
      return;

    subsectionManagement.setSubsectionActionLoading(id);
    deleteSubsection(id, {
      onSuccess: () => {
        toast.success("Subsection deleted successfully!");
        subsectionManagement.invalidateSubsections();
        subsectionManagement.setSubsectionActionLoading(null);
        queryClient.invalidateQueries({
          queryKey: ["articleDetails", articleManagement.selectedArticleId],
        });
      },
      onError: (error) => {
        toast.error((error as Error).message);
        subsectionManagement.setSubsectionActionLoading(null);
      },
    });
  };

  return (
    <ProtectedRoute allowedRoles={[0, 1, 2]}>
      <div className="min-h-screen transition-colors duration-200">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Content Management
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage IEEE articles, categories, and content
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="primary"
                onClick={
                  activeTab === "articles"
                    ? articleManagement.handleCreateClick
                    : categoryManagement.handleCreateCategoryClick
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                {activeTab === "articles"
                  ? "Create Article"
                  : "Create Category"}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Stats Cards */}
        <ContentStats
          totalArticles={data?.length || 0}
          totalCategories={categories?.length || 0}
        />

        {/* Filters (only for articles) */}
        {activeTab === "articles" && (
          <ArticleFilters
            searchTerm={articleManagement.searchTerm}
            setSearchTerm={articleManagement.setSearchTerm}
            selectedCategory={articleManagement.selectedCategory}
            setSelectedCategory={articleManagement.setSelectedCategory}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />
        )}

        {/* Content Lists */}
        {activeTab === "articles" ? (
          <ArticlesList
            articles={data || []}
            categories={categories}
            isLoading={isLoading}
            isError={isError}
            error={error}
            searchTerm={articleManagement.searchTerm}
            selectedCategory={articleManagement.selectedCategory}
            actionLoadingId={articleManagement.actionLoadingId}
            onEdit={articleManagement.handleEditClick}
            onDelete={handleDeleteArticle}
            onViewDetails={articleManagement.handleViewDetails}
          />
        ) : (
          <CategoriesList
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoryActionLoadingId={categoryManagement.categoryActionLoadingId}
            onEdit={categoryManagement.handleEditCategoryClick}
            onDelete={handleDeleteCategory}
          />
        )}

        {/* Modals */}
        <ArticleFormModal
          isOpen={articleManagement.isModalOpen}
          onClose={articleManagement.handleCloseModal}
          onSubmit={handleSubmitArticle}
          article={articleManagement.editingArticle}
          categories={categories}
          categoriesLoading={categoriesLoading}
        />

        <CategoryFormModal
          isOpen={categoryManagement.isCategoryModalOpen}
          onClose={categoryManagement.handleCloseCategoryModal}
          onSubmit={handleSubmitCategory}
          category={categoryManagement.editingCategory}
        />

        <ArticleDetailsModal
          isOpen={articleManagement.showDetails}
          onClose={articleManagement.handleCloseDetails}
          article={articleManagement.selectedArticle}
          detailedArticle={detailedArticle}
          detailsLoading={detailsLoading}
          subsectionActionLoadingId={
            subsectionManagement.subsectionActionLoadingId
          }
          onCreateSubsection={handleCreateSubsection}
          onUpdateSubsection={handleUpdateSubsection}
          onDeleteSubsection={handleDeleteSubsection}
          getCategoryName={getCategoryName}
          editingSubsection={editingSubsection}
          setEditingSubsection={setEditingSubsection}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ArticlesManagement;
