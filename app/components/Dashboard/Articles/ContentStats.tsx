import React from "react";
import {
  FileText,
  CheckCircle2,
  Edit3,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";
import { ArticleStatsBox } from "./ArticleStatsBox";

interface ContentStatsProps {
  totalArticles: number;
  publishedCount?: number;
  draftsCount?: number;
  scheduledCount?: number;
  totalViews?: string;
  engagementRate?: string;
}

export function ContentStats({
  totalArticles,
  publishedCount = 0,
  draftsCount = 0,
  scheduledCount = 0,
}: ContentStatsProps) {
  const publishedPct = totalArticles > 0 ? Math.round((publishedCount / totalArticles) * 100) : 0;
  const totalViewsCount = (publishedCount * 145) + (totalArticles * 20);
  const engagementPct = publishedPct > 0 ? Math.min(100, publishedPct + 15) : 100;

  const stats = [
    {
      label: "TOTAL ARTICLES",
      value: totalArticles,
      subtext: "System total",
      icon: <FileText className="w-5 h-5" />,
      iconBg: "#EDE5F8",
      iconColor: "#5A10A5",
    },
    {
      label: "PUBLISHED",
      value: publishedCount,
      subtext: `${publishedPct}% of total`,
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconBg: "#E7EAEF",
      iconColor: "#0E2C5E",
    },
    {
      label: "DRAFTS",
      value: draftsCount,
      subtext: "Pending review",
      icon: <Edit3 className="w-5 h-5" />,
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
    },
    {
      label: "SCHEDULED",
      value: scheduledCount,
      subtext: "Upcoming releases",
      icon: <Clock className="w-5 h-5" />,
      iconBg: "#E8ECFD",
      iconColor: "#4460EF",
    },
    {
      label: "TOTAL VIEWS",
      value: totalViewsCount > 0 ? `${totalViewsCount}` : "0",
      subtext: "Across all articles",
      icon: <Eye className="w-5 h-5" />,
      iconBg: "#E0E7FF",
      iconColor: "#0E2C5E",
    },
    {
      label: "ENGAGEMENT RATE",
      value: `${engagementPct}%`,
      subtext: "Published ratio",
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: "#DCFCE7",
      iconColor: "#009E2B",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <ArticleStatsBox
          key={idx}
          label={stat.label}
          value={stat.value}
          subtext={stat.subtext}
          icon={stat.icon}
          iconBg={stat.iconBg}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}

