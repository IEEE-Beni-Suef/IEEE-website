import { BellDot, Layers, User2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Users,
  Boxes,
  FileText,
  Calendar,
  LogOut,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import { useIntro } from "~/context/IntroContext";
import { clearAuth, useAuth } from "~/hooks/useAuth";

interface IProps {
  onNotificationClick?: () => void;
}

const DashboardNavbar = ({ onNotificationClick }: IProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { introReady } = useIntro();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Shared nav items (added "Contact Us")
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Committees", path: "/#committees", icon: Boxes },
    { label: "Events", path: "/events", icon: Calendar },
    { label: "Articles", path: "/articles", icon: FileText },
    { label: "About", path: "/about", icon: Users },
    { label: "Contact Us", path: "/contact", icon: Users },
  ];

  const authNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Home", path: "/", icon: Home },
    { label: "Events", path: "/events", icon: Calendar },
    { label: "Articles", path: "/articles", icon: FileText },
    { label: "Committees", path: "/#committees", icon: Boxes },
    { label: "About", path: "/about", icon: Users },
    { label: "Contact Us", path: "/contact", icon: Users },
  ];

  const currentNavItems =
    isMounted && isAuthenticated ? authNavItems : navItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative flex w-full flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex w-full px-4 bg-white items-center border-1.5 border-[#EEF0FF] shadow-md justify-between gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-11 w-11 items-center justify-center text-[#5A10A5] transition-all duration-200 hover:bg-[#F5F0FF]"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Layers className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex h-10 w-full items-center  px-3 capitalize ">
            <span className="truncate text-[11px] text-[#6C757D] sm:text-sm">
              dashboard /
            </span>
            <span className="ml-1 truncate text-[11px] font-semibold text-[#000640] sm:text-sm">
              users
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onNotificationClick}
            className="flex h-5 w-5 items-center justify-center text-[#5A10A5]"
          >
            <BellDot className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center text-[#4460EF]"
          >
            <User2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden w-full items-center justify-between md:flex">
        <div className="flex items-center justify-between w-[83%]">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-3xl transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-[#5A10A5] text-white"
                    : "text-[#5A10A5]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNotificationClick}
            className="flex h-10 w-10 items-center justify-center  text-[#5A10A5] hover:bg-[#F5F0FF] rounded-lg transition-colors"
          >
            <BellDot className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[#4460EF] hover:bg-[#F0F4FF] rounded-lg transition-colors"
          >
            <User2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden mt-3 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-[#CCB5E3] bg-white p-3 shadow-sm">
          <div className="space-y-2">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[#F5F0FF] text-[#5A10A5]"
                      : "text-gray-700 hover:bg-[#F5F0FF]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
