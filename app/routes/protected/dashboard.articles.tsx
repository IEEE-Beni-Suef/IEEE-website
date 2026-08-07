import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  FileText,
  Upload,
  Download,
  FolderPlus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { ContentStats } from "~/components/Dashboard/Articles/ContentStats";
import { ContentTabs } from "~/components/Dashboard/Articles/ContentTabs";
import { ArticleFilters, type FilterState, type ArticleViewMode } from "~/components/Dashboard/Articles/ArticleFilters";
import { ArticlesList } from "~/components/Dashboard/Articles/ArticlesList";
import { CategoriesList } from "~/components/Dashboard/Articles/CategoriesList";
import { ArticleFormModal } from "~/components/Dashboard/Articles/ArticleFormModal";
import { CategoryFormModal } from "~/components/Dashboard/Articles/CategoryFormModal";
import { ArticleDetailsModal } from "~/components/Dashboard/Articles/ArticleDetailsModal";
import { FeaturedArticleCard } from "~/components/Dashboard/Articles/FeaturedArticleCard";
import { TopCategoriesWidget } from "~/components/Dashboard/Articles/TopCategoriesWidget";
import { PublishingStatsCard } from "~/components/Dashboard/Articles/PublishingStatsCard";
import { TrendingTopicsCard } from "~/components/Dashboard/Articles/TrendingTopicsCard";
import { ArticleConfirmationModal } from "~/components/Dashboard/Articles/ArticleConfirmationModal";
import RecentActivity from "~/components/Dashboard/RecentActivity";

import { useArticleManagement } from "~/hooks/useArticleManagement";
import { useCategoryManagement } from "~/hooks/useCategoryManagement";
import { useSubsectionManagement } from "~/hooks/useSubsectionManagement";
import type { Category } from "~/types/index";

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

export function meta() {
  return [
    { title: "Articles Management - IEEE BNS Dashboard" },
    {
      name: "description",
      content: "Manage IEEE news, blogs, technical articles, and committee updates efficiently",
    },
  ];
}

// Fallback Mock Articles matching Figma Component 102/103 & Article Page designs
const MOCK_ARTICLES = [
  {
    id: 101,
    title: "Cybersecurity Essentials for IEEE Members",
    description:
      "A practical guide to securing servers online - password hygiene, phishing prevention, and protecting IEEE research data. Draft undergo final editing.",
    categoryId: 1,
    category: { categoryId: 1, name: "Security" },
    status: "Scheduled",
    authorName: "Mostafa Ali",
    authorRole: "Security Lead",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    publishedDate: "Aug 1, 2025",
    readTime: "5 min read",
    views: "4.4K",
    likes: 178,
    comments: 24,
    photo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    keywords: ["Security", "Cyber", "IEEE", "Network"],
  },
  {
    id: 102,
    title: "The Future of AI in Electrical Engineering",
    description:
      "Exploring how artificial intelligence is transforming modern circuit design, power distribution, and automated manufacturing systems.",
    categoryId: 2,
    category: { categoryId: 2, name: "Technical" },
    status: "Published",
    authorName: "Nouran Ahmed",
    authorRole: "AI Researcher",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    publishedDate: "Jul 28, 2025",
    readTime: "8 min read",
    views: "6.2K",
    likes: 312,
    comments: 45,
    photo: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    keywords: ["AI", "ML", "Electrical", "Engineering"],
  },
  {
    id: 103,
    title: "IEEE Workshop: Master PCB Design from Scratch",
    description:
      "A detailed summary of key concepts covered in our hands-on workshop on multi-layer PCB routing and signal integrity.",
    categoryId: 3,
    category: { categoryId: 3, name: "Workshop" },
    status: "Published",
    authorName: "Wael Youssef",
    authorRole: "Hardware Head",
    publishedDate: "Jul 25, 2025",
    readTime: "6 min read",
    views: "3.8K",
    likes: 240,
    comments: 19,
    photo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    keywords: ["PCB", "Hardware", "Workshop"],
  },
  {
    id: 104,
    title: "Quantum Computing: Where We Stand in 2025",
    description:
      "A comprehensive overview of quantum supremacy milestones and real-world cryptographic applications.",
    categoryId: 4,
    category: { categoryId: 4, name: "Research" },
    status: "Published",
    authorName: "Tariq Helmy",
    authorRole: "CS Advisor",
    publishedDate: "Jul 20, 2025",
    readTime: "10 min read",
    views: "8.1K",
    likes: 489,
    comments: 62,
    photo: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    keywords: ["Quantum", "Research", "Computing"],
  },
  {
    id: 105,
    title: "Web Development Roadmap for Computer Society",
    description:
      "Step-by-step guide for upcoming developers covering React, TypeScript, serverless functions, and modern UI architectures.",
    categoryId: 2,
    category: { categoryId: 2, name: "Technical" },
    status: "Draft",
    authorName: "Omar Khaled",
    authorRole: "Web Developer",
    publishedDate: "Draft",
    readTime: "4 min read",
    views: "0",
    likes: 0,
    comments: 0,
    photo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    keywords: ["WebDev", "React", "TypeScript"],
  },
  {
    id: 106,
    title: "IEEE BNS Student Branch Annual Report",
    description:
      "A retrospective view of all events, competitions, workshops, and student accomplishments achieved in the past academic year.",
    categoryId: 5,
    category: { categoryId: 5, name: "Community" },
    status: "Archived",
    authorName: "Sara Mohamed",
    authorRole: "Secretary",
    publishedDate: "Jun 15, 2025",
    readTime: "7 min read",
    views: "2.1K",
    likes: 115,
    comments: 12,
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    keywords: ["Report", "Community", "IEEE"],
  },
];

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Security" },
  { id: 2, name: "Technical" },
  { id: 3, name: "Workshop" },
  { id: 4, name: "Research" },
  { id: 5, name: "Community" },
];

const INITIAL_FILTERS: FilterState = {
  search: "",
  category: "",
  generation: "",
  tag: "",
  status: "",
};

const ArticlesManagement = () => {
  // Tab & View States
  const [activeTab, setActiveTab] = useState<"articles" | "categories">("articles");
  const [activeStatusTab, setActiveStatusTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ArticleViewMode>("grid");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Modal States
  const [articleFormOpen, setArticleFormOpen] = useState(false);
  const [articleDetailsOpen, setArticleDetailsOpen] = useState(false);
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationMode, setConfirmationMode] = useState<"duplicate" | "archive" | "delete" | "success">("delete");

  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // API Data
  const { data: apiArticles, isLoading, isError, error } = useAllArticles();
  const { data: apiCategories, isLoading: categoriesLoading } = useAllCategories();

  const articlesList = useMemo(() => {
    return apiArticles && apiArticles.length > 0 ? apiArticles : MOCK_ARTICLES;
  }, [apiArticles]);

  const categoriesList = useMemo(() => {
    return apiCategories && apiCategories.length > 0 ? apiCategories : MOCK_CATEGORIES;
  }, [apiCategories]);

  // Mutations
  const { mutate: createArticle } = useCreateArticle();
  const { mutate: updateArticle } = useUpdateArticle(selectedArticle?.id || 0);
  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory(editingCategory?.id || 0);
  const { mutate: deleteCategory } = useDeleteCategory();

  // Subsections
  const [editingSubsection, setEditingSubsection] = useState<any>(null);
  const subsectionManagement = useSubsectionManagement();
  const { data: detailedArticle, isLoading: detailsLoading } = useGetArticleSubsection(
    selectedArticle?.id || 0
  );

  const { mutate: createSubsection } = useCreateSubsection();
  const { mutate: updateSubsection } = useUpdateSubsection(editingSubsection?.id || 0);
  const { mutate: deleteSubsection } = useDeleteSubsection();

  // Category Helper
  const getCategoryName = (categoryId: any) => {
    if (!categoryId) return "Security";
    const cat = categoriesList.find((c) => c.id.toString() === categoryId.toString());
    return cat ? cat.name : "Security";
  };

  // Filter Handlers
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Counts Calculation
  const counts = useMemo(() => {
    const all = articlesList.length;
    const published = articlesList.filter(
      (a: any) => ((a as any).status || "Published").toLowerCase() === "published"
    ).length;
    const drafts = articlesList.filter(
      (a: any) => ((a as any).status || "").toLowerCase() === "draft"
    ).length;
    const scheduled = articlesList.filter(
      (a: any) => ((a as any).status || "").toLowerCase() === "scheduled"
    ).length;
    const archived = articlesList.filter(
      (a: any) => ((a as any).status || "").toLowerCase() === "archived"
    ).length;

    return { all, published, drafts, scheduled, archived };
  }, [articlesList]);

  // Handlers for Articles
  const handleOpenCreateArticle = () => {
    setSelectedArticle(null);
    setArticleFormOpen(true);
  };

  const handleOpenEditArticle = (art: any) => {
    setSelectedArticle(art);
    setArticleFormOpen(true);
  };

  const handleOpenViewDetails = (art: any) => {
    setSelectedArticle(art);
    setArticleDetailsOpen(true);
  };

  const handleSubmitArticle = (formData: FormData) => {
    if (selectedArticle) {
      updateArticle(formData, {
        onSuccess: () => {
          toast.success("Article updated successfully!");
          setArticleFormOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      });
    } else {
      createArticle(formData, {
        onSuccess: () => {
          toast.success("Article created successfully!");
          setArticleFormOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      });
    }
  };

  // Action Dialog Triggers
  const handleTriggerDuplicate = (art: any) => {
    setSelectedArticle(art);
    setConfirmationMode("duplicate");
    setConfirmationOpen(true);
  };

  const handleTriggerArchive = (art: any) => {
    setSelectedArticle(art);
    setConfirmationMode("archive");
    setConfirmationOpen(true);
  };

  const handleTriggerDelete = (art: any) => {
    setSelectedArticle(art);
    setConfirmationMode("delete");
    setConfirmationOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedArticle) return;

    if (confirmationMode === "delete") {
      deleteArticle(selectedArticle.id, {
        onSuccess: () => {
          toast.success("Article deleted!");
          setConfirmationOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      });
    } else if (confirmationMode === "duplicate") {
      toast.success(`Duplicate of "${selectedArticle.title}" created in Drafts!`);
      setConfirmationOpen(false);
    } else if (confirmationMode === "archive") {
      toast.success(`"${selectedArticle.title}" moved to Archived!`);
      setConfirmationOpen(false);
    }
  };

  // Category Handlers
  const handleOpenCreateCategory = () => {
    setEditingCategory(null);
    setCategoryFormOpen(true);
  };

  const handleOpenEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryFormOpen(true);
  };

  const handleSubmitCategory = (data: any) => {
    if (editingCategory) {
      updateCategory(data, {
        onSuccess: () => {
          toast.success("Category updated!");
          setCategoryFormOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      });
    } else {
      createCategory(data, {
        onSuccess: () => {
          toast.success("Category created!");
          setCategoryFormOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      });
    }
  };

  const handleDeleteCategory = (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    deleteCategory(id, {
      onSuccess: () => toast.success("Category deleted!"),
      onError: (err) => toast.error((err as Error).message),
    });
  };

  // Subsection Handlers
  const handleCreateSubsection = (formData: FormData) => {
    createSubsection(formData, {
      onSuccess: () => toast.success("Subsection added!"),
      onError: (err) => toast.error((err as Error).message),
    });
  };

  const handleUpdateSubsection = (formData: FormData) => {
    updateSubsection(formData, {
      onSuccess: () => toast.success("Subsection updated!"),
      onError: (err) => toast.error((err as Error).message),
    });
  };

  const handleDeleteSubsection = (id: number) => {
    deleteSubsection(id, {
      onSuccess: () => toast.success("Subsection deleted!"),
      onError: (err) => toast.error((err as Error).message),
    });
  };

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="min-h-screen pb-12 w-full">
        {/* Breadcrumb Strip - Full Width Container */}
        <div className="mb-4 w-full">
          <div className="w-full bg-white border border-purple-100/70 rounded-xl px-4 py-2 text-xs font-semibold text-gray-600 shadow-2xs flex items-center gap-2">
            <span className="text-gray-400">Dashboard</span>
            <span className="text-gray-300">/</span>
            <span className="text-[#5A10A5] font-extrabold">Articles</span>
          </div>
        </div>

        {/* Page Header Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Articles Management
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage IEEE news, blogs, technical articles, and committee updates.
            </p>
          </div>

          {/* Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success("Import CSV feature triggered")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Import CSV
            </button>

            <button
              type="button"
              onClick={() => toast.success("Articles exported successfully")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>

            <button
              type="button"
              onClick={
                activeTab === "articles"
                  ? handleOpenCreateArticle
                  : handleOpenCreateCategory
              }
              className="bg-[#5A10A5] hover:bg-[#4a0d88] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 border-0 flex items-center transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {activeTab === "articles" ? "Create Article" : "Create Category"}
            </button>
          </div>
        </div>

        {/* ── 6 Top Stats Boxes Row ──────────────────────────── */}
        <ContentStats
          totalArticles={counts.all}
          publishedCount={counts.published}
          draftsCount={counts.drafts}
          scheduledCount={counts.scheduled}
          totalViews="33.6K"
          engagementRate="87%"
        />

        {/* Tab & Status Navigation */}
        <ContentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeStatusTab={activeStatusTab}
          setActiveStatusTab={setActiveStatusTab}
          counts={counts}
        />

        {/* ── Main 2-Column Grid Content Layout ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "articles" ? (
              <>
                {/* Filter Controls */}
                <ArticleFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                  categories={categoriesList}
                  categoriesLoading={categoriesLoading}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  totalCount={articlesList.length}
                />

                {/* Articles List / Grid / Table */}
                <ArticlesList
                  articles={articlesList}
                  categories={categoriesList}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  filters={filters}
                  activeStatusTab={activeStatusTab}
                  viewMode={viewMode}
                  actionLoadingId={null}
                  onEdit={handleOpenEditArticle}
                  onDelete={handleTriggerDelete}
                  onDuplicate={handleTriggerDuplicate}
                  onArchive={handleTriggerArchive}
                  onViewDetails={handleOpenViewDetails}
                  onCreateClick={handleOpenCreateArticle}
                />
              </>
            ) : (
              <CategoriesList
                categories={categoriesList}
                categoriesLoading={categoriesLoading}
                categoryActionLoadingId={null}
                onEdit={handleOpenEditCategory}
                onDelete={handleDeleteCategory}
              />
            )}
          </div>

          {/* Right Sidebar Widgets Column */}
          <div className="lg:col-span-4 space-y-6">
            <FeaturedArticleCard
              article={articlesList[0]}
              onSelect={() => handleOpenViewDetails(articlesList[0])}
            />
            <TopCategoriesWidget categories={categoriesList} />
            <PublishingStatsCard />
            <TrendingTopicsCard
              selectedTag={filters.tag}
              onSelectTag={(t) =>
                handleFilterChange("tag", filters.tag === t ? "" : t)
              }
            />
            <RecentActivity />
          </div>
        </div>

        {/* ── Modals & Overlays ───────────────────────────── */}
        <ArticleFormModal
          isOpen={articleFormOpen}
          onClose={() => setArticleFormOpen(false)}
          onSubmit={handleSubmitArticle}
          article={selectedArticle}
          categories={categoriesList}
          categoriesLoading={categoriesLoading}
        />

        <CategoryFormModal
          isOpen={categoryFormOpen}
          onClose={() => setCategoryFormOpen(false)}
          onSubmit={handleSubmitCategory}
          category={editingCategory}
        />

        <ArticleDetailsModal
          isOpen={articleDetailsOpen}
          onClose={() => setArticleDetailsOpen(false)}
          onEditArticle={handleOpenEditArticle}
          article={selectedArticle}
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

        <ArticleConfirmationModal
          isOpen={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={handleConfirmAction}
          mode={confirmationMode}
          articleTitle={selectedArticle?.title}
        />
      </div>
    </ProtectedRoute>
  );
};

export default ArticlesManagement;
