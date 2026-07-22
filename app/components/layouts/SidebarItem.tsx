import { Link, useLocation } from "react-router";
import type { SidebarItemProps } from "~/types";

export const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex justify-center mx-auto lg:mx-0 w-fit lg:w-48 h-10 items-center lg:space-x-3 p-2 lg:px-4 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-[#5A10A5] text-[#FFFFFF] shadow-sm"
          : "text-[#000640] hover:bg-gray-100 hover:shadow-sm"
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="hidden md:block flex-1">{label}</span>
    </Link>
  );
};
