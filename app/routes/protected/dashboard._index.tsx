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
