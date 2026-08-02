import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  MoreHorizontal,
  Users,
  CheckSquare,
  Calendar,
  Eye,
  Megaphone,
  Code,
  Layout,
  Cpu,
  Globe,
  Share2,
  Award,
} from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

export interface CommitteeData {
  id: number;
  name: string;
  description?: string;
  headId?: number;
  headName?: string;
  headEmail?: string;
  headPhone?: string;
  viceHeadName?: string;
  viceHeadEmail?: string;
  memberCount?: number;
  tasksCount?: number;
  meetingsCount?: number;
  healthScore?: number;
  healthStatus?: string;
  status?: string;
  recruitmentStatus?: string;
  location?: string;
  foundedDate?: string;
  imageUrl?: string;
}

export interface CardTheme {
  primary: string;
  iconBg: string;
}

export const CARD_THEMES: CardTheme[] = [
  { primary: "#4460EF", iconBg: "#EEF1FD" },
  { primary: "#5A10A5", iconBg: "#F3EAFD" },
  { primary: "#0E2C5E", iconBg: "#E7EAEF" },
  { primary: "#17A2B8", iconBg: "#E0F7FA" },
];

interface DashboardCommitteeCardProps {
  committee: CommitteeData;
  index?: number;
  themeIndex?: number;
  theme?: CardTheme;
  onEdit: (committee: CommitteeData) => void;
  onViewMembers: (committee: CommitteeData) => void;
  onDelete: (id: number) => void;
  onViewDetails?: (committee: CommitteeData) => void;
}

const getCommitteeIcon = (name: string, color?: string) => {
  const lower = name.toLowerCase();
  const style = color ? { color } : undefined;
  if (lower.includes("backend") || lower.includes("dev"))
    return <Code className="w-5 h-5" style={style} />;
  if (lower.includes("ui") || lower.includes("ux") || lower.includes("design"))
    return <Layout className="w-5 h-5" style={style} />;
  if (lower.includes("robotics"))
    return <Cpu className="w-5 h-5" style={style} />;
  if (lower.includes("web"))
    return <Globe className="w-5 h-5" style={style} />;
  if (lower.includes("pr") || lower.includes("media"))
    return <Megaphone className="w-5 h-5" style={style} />;
  return <Award className="w-5 h-5" style={style} />;
};

export const DashboardCommitteeCard: React.FC<DashboardCommitteeCardProps> = ({
  committee,
  index,
  themeIndex,
  theme: explicitTheme,
  onEdit,
  onViewMembers,
  onDelete,
  onViewDetails,
}) => {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cardTheme = useMemo(() => {
    if (explicitTheme) return explicitTheme;
    if (typeof themeIndex === "number") {
      return CARD_THEMES[Math.abs(themeIndex) % CARD_THEMES.length];
    }
    if (typeof index === "number") {
      return CARD_THEMES[Math.abs(index) % CARD_THEMES.length];
    }
    if (committee.id) {
      return CARD_THEMES[Math.abs(committee.id) % CARD_THEMES.length];
    }
    return CARD_THEMES[0];
  }, [explicitTheme, themeIndex, index, committee.id]);

  const displayName = committee.name.toLowerCase().includes("committee")
    ? committee.name
    : `${committee.name} Committee`;

  const headName = committee.headName || "Layla Ibrahim";
  const viceName = committee.viceHeadName || "Ahmed Mohsen";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`rounded-3xl border border-s-4 p-5 transition-all duration-200 relative flex flex-col justify-between ${
        isDark ? "bg-[#101726] text-white" : "bg-white text-[#000640]"
      }`}
      style={{ borderColor: cardTheme.primary }}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: isDark
                  ? `${cardTheme.primary}25`
                  : cardTheme.iconBg,
              }}
            >
              {getCommitteeIcon(committee.name, cardTheme.primary)}
            </div>
            <div>
              <h3 className="font-extrabold text-base line-clamp-1">
                {displayName}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#09800F] mt-0.5">
                {committee.status || "Active"}
              </span>
            </div>
          </div>

          {/* 3 Dots Menu Button & Popup */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 rounded-xl transition-colors ${
                isDark
                  ? "hover:bg-[#1E2738] text-gray-400"
                  : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div
                className={`absolute right-0 top-8 w-44 rounded-2xl border shadow-xl z-30 py-2 transition-all ${
                  isDark
                    ? "bg-[#161F33] border-[#232D42] text-white"
                    : "bg-white border-[#EEF0FF] text-[#0D1B3E]"
                }`}
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit(committee);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                    isDark ? "hover:bg-[#1E2738]" : "hover:bg-[#F5F0FF]"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onViewMembers(committee);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                    isDark ? "hover:bg-[#1E2738]" : "hover:bg-[#F5F0FF]"
                  }`}
                >
                  View Members
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete(committee.id);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                    isDark ? "hover:bg-[#1E2738]" : "hover:bg-red-50"
                  }`}
                >
                  Archive
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Committee Head Box */}
        <div className="mt-4 space-y-2.5">
          <div
            className={`p-3 rounded-2xl flex items-center gap-3 ${
              isDark ? "bg-[#161F33]" : "bg-[#F8F9FE]"
            }`}
          >
            <div
              className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
              style={{ backgroundColor: cardTheme.primary }}
            >
              {getInitials(headName)}
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs font-bold truncate ${
                  isDark ? "text-white" : "text-[#0D1B3E]"
                }`}
              >
                {headName}
              </p>
              <p className="text-[11px] text-[#64748B]">Committee Head</p>
            </div>
          </div>

          {/* Vice Head Box */}
          <div
            className={`p-3 rounded-2xl flex items-center gap-3 ${
              isDark ? "bg-[#161F33]" : "bg-[#F8F9FE]"
            }`}
          >
            <div
              className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
              style={{ backgroundColor: cardTheme.primary }}
            >
              {getInitials(viceName)}
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs font-bold truncate ${
                  isDark ? "text-white" : "text-[#0D1B3E]"
                }`}
              >
                {viceName}
              </p>
              <p className="text-[11px] text-[#64748B]">
                Vice Head Committee
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metrics Boxes: Members, Tasks, Meetings */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <div
            className={`p-3 rounded-2xl text-center flex flex-col items-center justify-center ${
              isDark ? "bg-[#161F33]" : "bg-[#F8F9FE]"
            }`}
          >
            <Users className="w-4 h-4 text-[#64748B] mb-1" />
            <p
              className={`text-base font-extrabold ${
                isDark ? "text-white" : "text-[#0D1B3E]"
              }`}
            >
              {committee.memberCount ?? 42}
            </p>
            <p className="text-[11px] text-[#64748B] font-medium">
              Members
            </p>
          </div>

          <div
            className={`p-3 rounded-2xl text-center flex flex-col items-center justify-center ${
              isDark ? "bg-[#161F33]" : "bg-[#F8F9FE]"
            }`}
          >
            <CheckSquare className="w-4 h-4 text-[#64748B] mb-1" />
            <p
              className={`text-base font-extrabold ${
                isDark ? "text-white" : "text-[#0D1B3E]"
              }`}
            >
              {committee.tasksCount ?? 24}
            </p>
            <p className="text-[11px] text-[#64748B] font-medium">
              Tasks
            </p>
          </div>

          <div
            className={`p-3 rounded-2xl text-center flex flex-col items-center justify-center ${
              isDark ? "bg-[#161F33]" : "bg-[#F8F9FE]"
            }`}
          >
            <Calendar className="w-4 h-4 text-[#64748B] mb-1" />
            <p
              className={`text-base font-extrabold ${
                isDark ? "text-white" : "text-[#0D1B3E]"
              }`}
            >
              {committee.meetingsCount ?? 8}
            </p>
            <p className="text-[11px] text-[#64748B] font-medium">
              Meetings
            </p>
          </div>
        </div>

        {/* Recruitment & Health Score Row */}
        <div className="flex items-center justify-between mt-4 px-1">
          {/* Recruitment Left */}
          <div>
            <span className="text-[11px] text-[#64748B] font-medium block mb-1">
              Recruitment
            </span>
            <span className="inline-block bg-[#E3F2FD] text-[#1565C0] text-xs font-bold px-3.5 py-1 rounded-xl">
              {committee.recruitmentStatus || "Open"}
            </span>
          </div>

          {/* Health Score Right */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-[#64748B] font-medium block text-center mb-1">
              Health Score
            </span>
            <div
              className="relative w-12 h-12 rounded-full border-[3.5px] flex items-center justify-center"
              style={{ borderColor: cardTheme.primary }}
            >
              <span
                className={`text-[11px] font-black ${
                  isDark ? "text-white" : "text-[#0D1B3E]"
                }`}
              >
                {committee.healthScore ?? 85}%
              </span>
            </div>
            <span
              className="text-[11px] font-bold block text-center mt-1"
              style={{ color: cardTheme.primary }}
            >
              {committee.healthStatus || "Great"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom 2 Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={() => onViewMembers(committee)}
          className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
            isDark ? "hover:bg-[#1E2738]" : "hover:bg-gray-50"
          }`}
          style={{
            borderColor: cardTheme.primary,
            color: cardTheme.primary,
          }}
        >
          <Users className="w-4 h-4" style={{ color: cardTheme.primary }} />
          Members
        </button>

        <button
          onClick={() => onViewDetails && onViewDetails(committee)}
          className="py-2.5 px-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs hover:opacity-90"
          style={{ backgroundColor: cardTheme.primary }}
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default DashboardCommitteeCard;

