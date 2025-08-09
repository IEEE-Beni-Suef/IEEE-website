import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "./DashboardLayout";
import { SuperAdminSidebar, AdminSidebar, UserSidebar, GuestSidebar } from "./Sidebars";
import { InactiveBanner } from "../InactiveBanner";

export function RoleBasedDashboardLayout() {
  const { user } = useAuth();

  const getSidebarByRole = (roleId: number | undefined) => {
    switch (roleId) {
      case 0:
        return <SuperAdminSidebar />;
      case 1:
        return <AdminSidebar />;
      case 2:
        return <UserSidebar />;
      case 3:
        return <GuestSidebar />;
      default:
        return <GuestSidebar />;
    }
  };

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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user?.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {user?.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout 
      sidebar={getSidebarByRole(user?.roleId)} 
      header={header}
    />
  );
}

function getRoleName(roleId: number | undefined): string {
  switch (roleId) {
    case 0:
      return "Super Admin";
    case 1:
      return "Admin";
    case 2:
      return "Member";
    case 3:
      return "Guest";
    default:
      return "Unknown";
  }
}
