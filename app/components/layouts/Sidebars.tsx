import { Link, useLocation } from "react-router";

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
}

function SidebarItem({ to, icon, label }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// Super Admin Sidebar (roleId: 0)
export function SuperAdminSidebar() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Super Admin</h2>
        <p className="text-sm text-gray-500">Full system access</p>
      </div>
      <nav className="space-y-2">
        <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
        <SidebarItem to="/dashboard/users" icon="👥" label="Users Management" />
        <SidebarItem to="/dashboard/roles" icon="🔑" label="Role Management" />
        <SidebarItem
          to="/dashboard/settings"
          icon="⚙️"
          label="System Settings"
        />
      </nav>
    </div>
  );
}

// Admin Sidebar (roleId: 1)
export function AdminSidebar() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Admin</h2>
        <p className="text-sm text-gray-500">Committee management</p>
      </div>
      <nav className="space-y-2">
        <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
        <SidebarItem to="/dashboard/users" icon="👥" label="Users" />
        <SidebarItem
          to="/dashboard/committees"
          icon="🏛️"
          label="My Committee"
        />
        <SidebarItem to="/dashboard/reports" icon="📈" label="Reports" />
      </nav>
    </div>
  );
}

// User Sidebar (roleId: 2)
export function UserSidebar() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Member</h2>
        <p className="text-sm text-gray-500">Committee member</p>
      </div>
      <nav className="space-y-2">
        <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
        <SidebarItem to="/dashboard/profile" icon="👤" label="My Profile" />
        <SidebarItem to="/dashboard/tasks" icon="✅" label="My Tasks" />
        <SidebarItem to="/dashboard/committee" icon="🏛️" label="My Committee" />
      </nav>
    </div>
  );
}

// Guest Sidebar (roleId: 3)
export function GuestSidebar() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900">Guest</h2>
        <p className="text-sm text-gray-500">Limited access</p>
      </div>
      <nav className="space-y-2">
        <SidebarItem to="/dashboard" icon="📊" label="Dashboard" />
        <SidebarItem to="/dashboard/profile" icon="👤" label="My Profile" />
        <SidebarItem to="/dashboard/events" icon="📅" label="Events" />
      </nav>
    </div>
  );
}
