import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "./DashboardLayout";

import { InactiveBanner } from "../InactiveBanner";
import { getRoleName } from "~/utils/utile";
import React from "react";
import {
  GuestSidebar,
  HeadSidebar,
  HighBoardSidebar,
  HrSidebar,
  MemberSidebar,
  ViceSidebar,
} from "./Sidebars";

// Map based sidebar resolver (roleId -> component)
const sidebarMap: Record<number, React.ReactElement> = {
  1: <HighBoardSidebar />,
  2: <HeadSidebar />,
  3: <MemberSidebar />,
  4: <HrSidebar />,
  5: <ViceSidebar />,
};

export function RoleBasedDashboardLayout() {
  const { user } = useAuth();
  const roleId = user?.roleId ?? -1;

  const sidebar = sidebarMap[roleId] ?? <GuestSidebar />;

  const header = (
    <div>
      <InactiveBanner />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              {user?.email} • Role: {getRoleName(user?.roleId)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user?.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return <DashboardLayout sidebar={sidebar} header={header} />;
}
