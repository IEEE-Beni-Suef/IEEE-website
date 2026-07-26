import {
  Boxes,
  LayoutDashboard,
  Split,
  Users,
  User,
  CheckSquare,
  Building,
  Calendar,
  CalendarDays,
  FileText,
  User2,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  Mail,
  Award,
} from "lucide-react";
import { sidebarConfigs } from "../../utils/lists";
import { SidebarItem } from "./SidebarItem";
import { useAuth, clearAuth } from "~/hooks/useAuth";
import { useTheme } from "~/hooks/useTheme";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "../ui/SidebarLogo";
import { getRoleName } from "~/utils/utile";

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard />,
    Users: <Users />,
    Boxes: <Boxes />,
    Split: <Split />,
    User: <User />,
    CheckSquare: <CheckSquare />,
    Building: <Building />,
    Calendar: <Calendar />,
    CalendarDays: <CalendarDays />,
    FileText: <FileText />,
    Mail: <Mail />,
    Award: <Award />,
  };
  return iconMap[iconName] || <LayoutDashboard />;
};

interface DynamicSidebarProps {
  roleId?: number;
}

export const DynamicSidebar = ({ roleId }: DynamicSidebarProps) => {
  const config =
    sidebarConfigs[roleId as keyof typeof sidebarConfigs] ||
    sidebarConfigs.default;

  const { user } = useAuth();
  const { isDark } = useTheme();

  const userPhoto =
    (user as any)?.photo ||
    (user as any)?.avatar ||
    (user as any)?.imageUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  return (
    <div
      className={`h-full w-16 md:w-full border-1.5 flex flex-col justify-between transition-colors duration-200 ${
        isDark
          ? "bg-[#101726] border-[#232D42] shadow-none text-white"
          : "bg-white border-[#CCB5E3] shadow-[0px_1px_17.1px_0px_#CCB5E3] text-[#000640]"
      }`}
    >
      <div>
        <div className="flex flex-col items-center mt-3 mb-10">
          <Link to="/" className="flex items-center space-x-3 group">
            <figure className="h-13 w-13 md:h-25 md:w-25 md:p-3">
              <Logo />
            </figure>
          </Link>
          <h2 className={`hidden md:block text-xl font-bold ${isDark ? "text-white" : "text-[#000640]"}`}>
            {config.title}
          </h2>
          <p className={`hidden md:block text-sm font-normal ${isDark ? "text-gray-400" : "text-[#1F2B6C]"}`}>
            {config.description}
          </p>
        </div>
        <nav className="space-y-2 lg:ml-8">
          {config.navigation.map((item, index) => (
            <SidebarItem
              key={index}
              to={item.to}
              icon={getIconComponent(item.icon)}
              label={item.label}
            />
          ))}
        </nav>
      </div>
      <div className="space-y-2 p-2">
        <div
          className={`w-full rounded-xl overflow-hidden p-3 border transition-colors ${
            isDark ? "bg-[#182033] border-[#253047]" : "bg-white border-gray-100 shadow-xs"
          }`}
        >
          <div className="flex items-center space-x-3">
            <img
              src={userPhoto}
              alt="User"
              className="w-9 h-9 rounded-full object-cover border-2 border-purple-500"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-[#000640]"}`}>
                {user?.fName && user?.lName
                  ? `${user.fName} ${user.lName}`
                  : user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Mohammed Sharaf"}
              </p>
              <p className={`text-xs truncate ${isDark ? "text-purple-400" : "text-[#3348B3]"}`}>
                {getRoleName(user?.roleId) || "Chairman IEEE BSU"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
