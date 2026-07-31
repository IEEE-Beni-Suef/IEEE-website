import React from "react";
import HighBoardDashboard from "~/components/Dashboard/HighBoardDashboard";
import { DynamicSidebar as Sidebar } from "~/components/layouts/Sidebars";
import DashboardNavbar from "~/components/Dashboard/DashboardNavbar";

export function Dashboard() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#0B0F19]">
      <aside className="w-64 shrink-0 h-full hidden lg:block">
        <Sidebar roleId={1} />
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-[#232D42]">
          <DashboardNavbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <HighBoardDashboard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
