import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "./DashboardLayout";

import React from "react";
import { DynamicSidebar } from "./Sidebars";

export function RoleBasedDashboardLayout() {
  const { user } = useAuth();
  const roleId = user?.roleId ?? -1;

  const sidebar = <DynamicSidebar roleId={roleId} />;

  return <DashboardLayout sidebar={sidebar} />;
}
