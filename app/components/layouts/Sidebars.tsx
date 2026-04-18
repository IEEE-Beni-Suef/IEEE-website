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
} from "lucide-react";
import { sidebarConfigs } from "../../utils/lists";
import { SidebarItem } from "./SidebarItem";
import { useAuth, clearAuth } from "~/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 ">
            {config.title}
          </h2>
          <p className="text-sm text-gray-500">{config.description}</p>
        </div>
        <nav className="space-y-2">
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
      <div className="space-y-2">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Profile Actions - Collapsible */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isProfileExpanded ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="px-3 pb-3 space-y-1 border-b border-gray-200 dark:border-gray-700">
              <Link
                to="/dashboard/profile"
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 mt-2"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/dashboard/settings"
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200  cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            {isProfileExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
