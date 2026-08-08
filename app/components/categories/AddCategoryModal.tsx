import React, { useState, useEffect } from "react";
import {
  X,
  Wrench,
  Mic,
  Terminal,
  Laptop,
  Users,
  Code,
  Trophy,
  BookOpen,
  Sparkles,
  Tag,
  Folder,
  Check,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

export interface CategoryData {
  id?: string;
  name: string;
  description?: string;
  iconName?: string;
  color?: string;
  status?: "Active" | "Hidden";
}

interface AddCategoryModalProps {
  isOpen: boolean;
  category?: CategoryData | null;
  onClose: () => void;
  onSubmit: (data: CategoryData) => void;
  isLoading?: boolean;
}

const iconsList = [
  { name: "Wrench", icon: Wrench },
  { name: "Mic", icon: Mic },
  { name: "Terminal", icon: Terminal },
  { name: "Laptop", icon: Laptop },
  { name: "Users", icon: Users },
  { name: "Code", icon: Code },
  { name: "Trophy", icon: Trophy },
  { name: "BookOpen", icon: BookOpen },
  { name: "Sparkles", icon: Sparkles },
  { name: "Tag", icon: Tag },
  { name: "Folder", icon: Folder },
];

const colorsList = [
  "#5A10A5", // IEEE Purple
  "#2563EB", // Blue
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Yellow
  "#F97316", // Orange
  "#EF4444", // Red
  "#EC4899", // Pink
  "#8B5CF6", // Violet
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  category,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Wrench");
  const [selectedColor, setSelectedColor] = useState("#5A10A5");
  const [status, setStatus] = useState<"Active" | "Hidden">("Active");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setName(category.name || "");
        setDescription(category.description || "");
        setSelectedIcon(category.iconName || "Wrench");
        setSelectedColor(category.color || "#5A10A5");
        setStatus(category.status || "Active");
      } else {
        setName("");
        setDescription("");
        setSelectedIcon("Wrench");
        setSelectedColor("#5A10A5");
        setStatus("Active");
      }
      setShowSuccessOverlay(false);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      id: category?.id,
      name,
      description,
      iconName: selectedIcon,
      color: selectedColor,
      status,
    });

    setShowSuccessOverlay(true);
  };

  const SelectedIconComp =
    iconsList.find((i) => i.name === selectedIcon)?.icon || Wrench;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-purple-100 bg-white text-gray-900 p-6 sm:p-8 shadow-2xl transition-all relative">
        {/* Success Confirmation Overlay */}
        {showSuccessOverlay ? (
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 max-w-xs leading-snug mb-8">
              You Have Successfully Created a New Category
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowSuccessOverlay(false);
                onClose();
              }}
              className="w-44 py-3 rounded-xl font-bold text-sm bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {category ? "Edit Category" : "Add Category"}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Create a new IEEE event category
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E2738] text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Banner */}
            <div className="my-4 p-4 rounded-2xl bg-purple-50/50 dark:bg-[#182033] border border-purple-100 dark:border-[#253047] flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform"
                style={{ backgroundColor: selectedColor }}
              >
                <SelectedIconComp className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
                  {name || "Category Name"}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {description || "Short description will appear here"}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Workshop"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this category..."
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Icon Picker */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Icon
                </label>
                <div className="flex flex-wrap gap-2 p-2.5 rounded-xl border bg-gray-50/50 dark:bg-[#182033] border-gray-200 dark:border-[#253047]">
                  {iconsList.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = selectedIcon === item.name;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedIcon(item.name)}
                        className={`p-2 rounded-lg transition-all ${
                          isSelected
                            ? "bg-[#5A10A5] text-white shadow-xs scale-105"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Picker */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Color
                </label>
                <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                  {colorsList.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform shrink-0 flex items-center justify-center ${
                        selectedColor === c
                          ? "ring-2 ring-purple-500 ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c }}
                    >
                      {selectedColor === c && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Radio Toggle (Button 2-state style) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("Active")}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      status === "Active"
                        ? "bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 border-purple-300"
                        : "bg-gray-50 dark:bg-[#182033] text-gray-500 border-gray-200 dark:border-[#253047]"
                    }`}
                  >
                    {status === "Active" && <Check className="w-3.5 h-3.5" />}
                    Active
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus("Hidden")}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      status === "Hidden"
                        ? "bg-purple-100 dark:bg-purple-950 text-[#5A10A5] dark:text-purple-300 border-purple-300"
                        : "bg-gray-50 dark:bg-[#182033] text-gray-500 border-gray-200 dark:border-[#253047]"
                    }`}
                  >
                    {status === "Hidden" && <Check className="w-3.5 h-3.5" />}
                    Hidden
                  </button>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-gray-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#5A10A5] text-white hover:bg-purple-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading
                    ? "Saving..."
                    : category
                    ? "Save Changes"
                    : "+ Create Category"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCategoryModal;
