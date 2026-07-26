import { Outlet } from "react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { NotificationModal } from "../NotificationModal";
import { useTheme } from "~/hooks/useTheme";

interface DashboardLayoutProps {
  children?: ReactNode;
  sidebar: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`h-screen transition-colors duration-200 ${isDark ? "bg-[#0B0F19] text-white" : "bg-[#F8FAFC] text-[#000640]"}`}>
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <aside className="block h-full lg:w-73">{sidebar}</aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
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
