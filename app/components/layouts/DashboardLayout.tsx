import { Outlet } from "react-router";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
  header?: ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {header && (
        <div className="bg-white shadow-sm border-b">
          {header}
        </div>
      )}
      <div className="flex">
        <div className="w-64 bg-white shadow-sm border-r min-h-screen">
          {sidebar}
        </div>
        <div className="flex-1 p-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
