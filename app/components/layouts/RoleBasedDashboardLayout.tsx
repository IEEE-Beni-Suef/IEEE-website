import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "./DashboardLayout";

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

  return <DashboardLayout sidebar={sidebar} />;
}
