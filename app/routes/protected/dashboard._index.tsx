import { useAuth } from "../../hooks/useAuth";

export default function DashboardIndex() {
  const { user } = useAuth();

  const getDashboardContent = (roleId: number | undefined) => {
    switch (roleId) {
      case 0:
        return <SuperAdminDashboard />;
      case 1:
        return <AdminDashboard />;
      case 2:
        return <UserDashboard />;
      case 3:
        return <GuestDashboard />;
      default:
        return <GuestDashboard />;
    }
  };

  return <div className="space-y-6">{getDashboardContent(user?.roleId)}</div>;
}

function SuperAdminDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,234" icon="👥" />
        <StatCard title="Active Committees" value="8" icon="🏛️" />
        <StatCard title="System Health" value="98%" icon="⚡" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">System Overview</h2>
        <p className="text-gray-600">
          Complete system administration and management capabilities.
        </p>
      </div>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Committee Members" value="45" icon="👥" />
        <StatCard title="Pending Tasks" value="8" icon="📋" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Committee Management</h2>
        <p className="text-gray-600">
          Manage your committee members, events, and activities.
        </p>
      </div>
    </>
  );
}

function UserDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="My Tasks" value="3" icon="✅" />
        <StatCard title="Upcoming Events" value="2" icon="📅" />
        <StatCard title="Committee" value="CIS" icon="🏛️" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome Member</h2>
        <p className="text-gray-600">
          Access your tasks, events, and committee information.
        </p>
      </div>
    </>
  );
}

function GuestDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Public Events" value="5" icon="📅" />
        <StatCard title="Committees" value="8" icon="🏛️" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome Guest</h2>
        <p className="text-gray-600">
          View public events and general information.
        </p>
      </div>
    </>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
