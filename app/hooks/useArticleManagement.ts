import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useArticleManagement() {
  const queryClient = useQueryClient();

  // Article state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Article handlers
  const handleCreateClick = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (article: any) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleViewDetails = (article: any) => {
    setSelectedArticle(article);
    setSelectedArticleId(article.id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedArticleId(null);
    setSelectedArticle(null);
  };

  const setActionLoading = (id: number | null) => {
    setActionLoadingId(id);
  };

  const invalidateArticles = () => {
    queryClient.invalidateQueries({ queryKey: ["articles"] });
  };

  return {
    // State
    isModalOpen,
    editingArticle,
    actionLoadingId,
    selectedArticle,
    selectedArticleId,
    showDetails,
    searchTerm,
    selectedCategory,

    // Setters
    setSearchTerm,
    setSelectedCategory,
    setActionLoading,

    // Handlers
    handleCreateClick,
    handleEditClick,
    handleCloseModal,
    handleViewDetails,
    handleCloseDetails,
    invalidateArticles,
  };
}
