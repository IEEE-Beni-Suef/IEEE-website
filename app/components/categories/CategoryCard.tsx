import React from "react";
import {
  Wrench,
  Laptop,
  Trophy,
  Mic,
  Users,
  Terminal,
  BookOpen,
  Eye,
  Pencil,
  Copy,
  Archive,
  Trash2,
} from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  status: "Active" | "Hidden";
  totalEvents: number;
  upcomingEvents: number;
  createdDate: string;
  lastUpdated: string;
  color?: string; // Top border & number color (e.g. #5A10A5, #059669, #4460EF, #D97706, #DC2626)
  bgColor?: string; // Icon background color (e.g. #EEE3FA, #D1FAE5, #E8ECFD, #FEF3C7, #FEE2E2)
  iconName?: string;
}

interface CategoryCardProps {
  category: CategoryItem;
  onView: (cat: CategoryItem) => void;
  onEdit: (cat: CategoryItem) => void;
  onDuplicate: (cat: CategoryItem) => void;
  onArchive: (cat: CategoryItem) => void;
  onDelete: (cat: CategoryItem) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onView,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
}) => {
  // Determine top border color and icon styling based on category name or explicitly passed props
  const getCategoryStyles = () => {
    const nameLower = category.name.toLowerCase();
    if (nameLower.includes("workshop")) {
      return {
        topBorder: "#5A10A5",
        iconBg: "#EEE3FA",
        iconColor: "#5A10A5",
        IconComponent: Wrench,
      };
    }
    if (nameLower.includes("bootcamp")) {
      return {
        topBorder: "#059669",
        iconBg: "#D1FAE5",
        iconColor: "#059669",
        IconComponent: Laptop,
      };
    }
    if (nameLower.includes("competition") || nameLower.includes("contest")) {
      return {
        topBorder: "#4460EF",
        iconBg: "#E8ECFD",
        iconColor: "#4460EF",
        IconComponent: Trophy,
      };
    }
    if (nameLower.includes("seminar") || nameLower.includes("talk")) {
      return {
        topBorder: "#D97706",
        iconBg: "#FEF3C7",
        iconColor: "#D97706",
        IconComponent: Mic,
      };
    }
    if (nameLower.includes("orientation") || nameLower.includes("hackathon")) {
      return {
        topBorder: "#DC2626",
        iconBg: "#FEE2E2",
        iconColor: "#DC2626",
        IconComponent: Terminal,
      };
    }
    return {
      topBorder: category.color || "#5A10A5",
      iconBg: category.bgColor || "#EEE3FA",
      iconColor: category.color || "#5A10A5",
      IconComponent: BookOpen,
    };
  };

  const { topBorder, iconBg, iconColor, IconComponent } = getCategoryStyles();

  return (
    <div
      className="rounded-2xl p-5 border border-purple-100/80 bg-white transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden"
      style={{ borderTop: `4px solid ${topBorder}` }}
    >
      {/* Top Header Section */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-gray-900">
                {category.name}
              </h3>
              <p className="text-[11px] font-medium text-gray-400">
                Created {category.createdDate}
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
              category.status === "Active"
                ? "bg-[#D1FAE5] text-[#059669]"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {category.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {category.description ||
            "Hands-on technical skill-building sessions with guided instruction and practice."}
        </p>

        {/* Inside Stat Pills Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-purple-50/40 border border-purple-100/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TOTAL EVENTS
            </p>
            <p
              className="text-lg font-extrabold mt-0.5"
              style={{ color: topBorder }}
            >
              {category.totalEvents}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50/40 border border-purple-100/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              UPCOMING
            </p>
            <p className="text-lg font-extrabold text-[#4460EF] mt-0.5">
              {category.upcomingEvents}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 font-medium italic">
          Last updated {category.lastUpdated}
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-3 border-t border-purple-50 flex items-center justify-between gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => onView(category)}
          className="flex-1 min-w-[55px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-purple-100/70 text-[#5A10A5] hover:bg-purple-200/70 transition-colors border-0 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>

        <button
          type="button"
          onClick={() => onEdit(category)}
          className="flex-1 min-w-[55px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border-0 cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>

        <button
          type="button"
          onClick={() => onDuplicate(category)}
          className="flex-1 min-w-[65px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border-0 cursor-pointer"
        >
          <Copy className="w-3.5 h-3.5" /> Duplicate
        </button>

        <button
          type="button"
          onClick={() => onArchive(category)}
          className="flex-1 min-w-[60px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors border-0 cursor-pointer"
        >
          <Archive className="w-3.5 h-3.5" /> Archive
        </button>

        <button
          type="button"
          onClick={() => onDelete(category)}
          className="p-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors border-0 cursor-pointer flex items-center justify-center"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
