import { useAuth } from "../../hooks/useAuth";
import HighBoardDashboard from "../../components/Dashboard/HighBoardDashboard";
import HeadDashboard from "../../components/Dashboard/HeadDashboard";
import MemberDashboard from "../../components/Dashboard/MemberDashboard";
import HrDashboard from "../../components/Dashboard/HrDashboard";
import ViceDashboard from "../../components/Dashboard/ViceDashboard";

export default function DashboardIndex() {
  const { user } = useAuth();
  const roleId = user?.roleId;

  const renderDashboard = (id?: number) => {
    switch (id) {
      case 1:
        return <HighBoardDashboard />;
      case 2:
        return <HeadDashboard />;
      case 3:
        return <MemberDashboard />;
      case 4:
        return <HrDashboard />;
      case 5:
        return <ViceDashboard />;
      default:
        return <div>No dashboard available</div>;
    }
  };

  return <div className="space-y-6">{renderDashboard(roleId)}</div>;
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
