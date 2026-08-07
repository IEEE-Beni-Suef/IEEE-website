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
  publishedCount = 6,
  draftsCount = 2,
  scheduledCount = 3,
  totalViews = "33.6K",
  engagementRate = "87%",
}: ContentStatsProps) {
  const stats = [
    {
      label: "TOTAL ARTICLES",
      value: totalArticles || 12,
      subtext: "12 total created",
      icon: <FileText className="w-5 h-5" />,
      iconBg: "#EDE5F8",
      iconColor: "#5A10A5",
    },
    {
      label: "PUBLISHED",
      value: publishedCount,
      subtext: "50% of total",
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconBg: "#E7EAEF",
      iconColor: "#0E2C5E",
    },
    {
      label: "DRAFTS",
      value: draftsCount,
      subtext: "pending review",
      icon: <Edit3 className="w-5 h-5" />,
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
    },
    {
      label: "SCHEDULED",
      value: scheduledCount,
      subtext: "upcoming releases",
      icon: <Clock className="w-5 h-5" />,
      iconBg: "#E8ECFD",
      iconColor: "#4460EF",
    },
    {
      label: "TOTAL VIEWS",
      value: totalViews,
      subtext: "2.5k this month",
      icon: <Eye className="w-5 h-5" />,
      iconBg: "#E0E7FF",
      iconColor: "#0E2C5E",
    },
    {
      label: "ENGAGEMENT RATE",
      value: engagementRate,
      subtext: "+ 2% from last mo",
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

