import { Outlet } from "react-router";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 py-6 pl-6 h-full">{sidebar}</aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="h-full p-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
                <div className="p-6">{children || <Outlet />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
