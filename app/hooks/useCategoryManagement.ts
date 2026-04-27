import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Category } from "~/types/index";

export function useCategoryManagement() {
  const queryClient = useQueryClient();

  // Category state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryActionLoadingId, setCategoryActionLoadingId] = useState<
    number | null
  >(null);

  // Category handlers
  const handleCreateCategoryClick = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategoryClick = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const setCategoryActionLoading = (id: number | null) => {
    setCategoryActionLoadingId(id);
  };

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  return {
    // State
    isCategoryModalOpen,
    editingCategory,
    categoryActionLoadingId,

    // Setters
    setCategoryActionLoading,

    // Handlers
    handleCreateCategoryClick,
    handleEditCategoryClick,
    handleCloseCategoryModal,
    invalidateCategories,
  };
}
