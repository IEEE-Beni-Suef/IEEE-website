import {
  Boxes,
  LayoutDashboard,
  Split,
  Users,
  User,
  CheckSquare,
  Building,
  Calendar,
  CalendarDays,
  FileText,
  User2,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  Mail,
  Award,
} from "lucide-react";
import { sidebarConfigs } from "../../utils/lists";
import { SidebarItem } from "./SidebarItem";
import { useAuth, clearAuth } from "~/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "../ui/SidebarLogo";
import { getRoleName } from "~/utils/utile";

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
    CalendarDays: <CalendarDays />,
    FileText: <FileText />,
    Mail: <Mail />,
    Award: <Award />,
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

  const { user } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <div className="h-full w-16 md:w-full border-1.5 border-[#CCB5E3] shadow-[0px_1px_17.1px_0px_#CCB5E3]  flex flex-col justify-between border-r-1.5  ">
      <div>
        <div className="flex flex-col items-center mt-3 mb-10">
          <Link to="/" className="flex items-center space-x-3 group">
            <figure className="h-13 w-13 md:h-25 md:w-25 md:p-3">
              <Logo />
            </figure>
          </Link>
          <h2 className="hidden md:block text-xl font-bold  text-[##000640] ">
            {config.title}
          </h2>
          <p className="hidden md:block text-sm font-normal text-[#1F2B6C]">
            {config.description}
          </p>
        </div>
        <nav className=" space-y-2 lg:ml-8">
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
      <div className="space-y-2 ">
        <div className="w-full bg-white rounded-lg  overflow-hidden">
          {/* Profile Actions - Collapsible */}

          {/* <button
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200  cursor-pointer"
          > */}
          <div className="flex p-3 items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <User2 className="w-6.25 h-6.25 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-[#000640] truncate">
                {user?.fName && user?.lName
                  ? `${user.fName} ${user.lName}`
                  : "User"}
              </p>
              <p className="text-xs text-[#3348B3] truncate">
                {getRoleName(user?.roleId)}
              </p>
            </div>
          </div>

          {/* </button> */}
        </div>
      </div>
    </div>
  );
};
