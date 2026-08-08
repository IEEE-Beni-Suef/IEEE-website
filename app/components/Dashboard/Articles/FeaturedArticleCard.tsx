import React from "react";
import { Eye, Heart, ArrowUpRight } from "lucide-react";

interface FeaturedArticleProps {
  article?: any;
  onSelect?: () => void;
}

export function FeaturedArticleCard({ article, onSelect }: FeaturedArticleProps) {
  const featured = article || {
    id: "featured-1",
    title: "Legacy of Nikola Tesla: IEEE Tribute",
    description:
      "Exploring the revolutionary work of Tesla and its lasting impact on modern electrical engineering and power systems.",
    photo:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    views: "4.8K",
    likes: 342,
    readTime: "6 min read",
    publishedDate: "Aug 2, 2025",
  };

  return (
    <div
      onClick={onSelect}
      className="relative overflow-hidden rounded-2xl border border-purple-800 p-4 cursor-pointer transition-all group bg-gradient-to-br from-purple-900 via-indigo-900 to-[#5A10A5] text-white shadow-md hover:shadow-lg"
    >
      <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
        <img
          src={featured.photo}
          alt={featured.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5A10A5] text-white shadow-xs">
          ⭐ Featured Article
        </span>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white/90 text-[11px] font-medium">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {featured.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400" /> {featured.likes}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
            {featured.title}
          </h4>
          <ArrowUpRight className="w-4 h-4 text-purple-300 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <p className="text-xs line-clamp-2 text-purple-100/80">
          {featured.description}
        </p>
      </div>
    </div>
  );
}

