import { Link, useLocation } from "react-router";
import type { SidebarItemProps } from "~/types";

export const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-100 text-blue-700 shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="flex-1">{label}</span>
    </Link>
  );
};
