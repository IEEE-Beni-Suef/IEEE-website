import {
  Boxes,
  LayoutDashboard,
  Split,
  Users,
  User,
  CheckSquare,
  Building,
  Calendar,
  FileText,
} from "lucide-react";
import { sidebarConfigs } from "../../utils/lists";
import { SidebarItem } from "./SidebarItem";

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard />,
    Users: <Users />,
    Boxes: <Boxes />,
    Split: <Split />,
    User: <User />,
    CheckSquare: <CheckSquare />,
    Building: <Building />,
    Calendar: <Calendar />,
    FileText: <FileText />,
  };
  return iconMap[iconName] || <LayoutDashboard />;
};

interface DynamicSidebarProps {
  roleId?: number;
}

export const DynamicSidebar = ({ roleId }: DynamicSidebarProps) => {
  const config =
    sidebarConfigs[roleId as keyof typeof sidebarConfigs] ||
    sidebarConfigs.default;

  return (
    <div className="h-full">
      <div className="mb-8">
        <h2 className="text-lg font-semibold">{config.title}</h2>
        <p className="text-sm text-gray-500">{config.description}</p>
      </div>
      <nav className="space-y-2">
        {config.navigation.map((item, index) => (
          <SidebarItem
            key={index}
            to={item.to}
            icon={getIconComponent(item.icon)}
            label={item.label}
          />
        ))}
      </nav>
    </div>
  );
};
