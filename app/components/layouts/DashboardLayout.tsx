import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { Section } from "../ui/Section";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className="flex mt-16 min-h-[calc(100vh-9rem)]">
      <div className="w-64 shadow-sm border-r ">{sidebar}</div>
      <div className="flex-1 p-6">{children || <Outlet />}</div>
    </div>
  );
}
