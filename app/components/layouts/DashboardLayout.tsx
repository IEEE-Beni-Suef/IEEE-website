import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { NotificationModal } from "../NotificationModal";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div className="h-screen bg-gray-50 ">
      {/* Mobile Sidebar Overlay */}
      {/* {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )} */}

      <div className="flex h-full ">
        {/* Desktop Sidebar */}
        <aside className="block h-full  lg:w-73">{sidebar}</aside>

        {/* Mobile Sidebar */}
        {/* <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden pt-16 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full p-6 bg-gray-50 border-r border-gray-200 ">
            {sidebar}
          </div>
        </aside> */}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Menu Button */}
          {/* <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className=" w-14 h-14 lg:hidden fixed bottom-4 z-20 right-4 p-3 cursor-pointer rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
          >
            {isMobileSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button> */}

          <div className="flex-1 overflow-y-auto ">
            <div className="h-full p-0 sm:py-6 sm:px-1 py-0">
              <div className="h-full overflow-y-auto">
                <div className="lg:px-6">
                  <div className="mb-4">
                    <DashboardNavbar
                      onNotificationClick={() => setShowNotificationModal(true)}
                    />
                  </div>
                  {children || <Outlet />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Notification Modal */}
        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
        />
      </div>
    </div>
  );
}
