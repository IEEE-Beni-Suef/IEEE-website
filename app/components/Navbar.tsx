import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useAuth, clearAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { useIntro } from "../context/IntroContext";
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
import Logo from "./ui/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { introReady } = useIntro();

  useEffect(() => {
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
    { label: "Articles", path: "/#articles", icon: FileText },
    { label: "About", path: "/about", icon: Users },
    { label: "Contact Us", path: "/contact", icon: Users },   // 👈 added
  ];

  const authNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Home", path: "/", icon: Home },
    { label: "Committees", path: "/#committees", icon: Boxes },
    { label: "Events", path: "/events", icon: Calendar },
    { label: "Articles", path: "/#articles", icon: FileText },
    { label: "About", path: "/about", icon: Users },
    { label: "Contact Us", path: "/contact", icon: Users },   // 👈 added
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 duration-300 bg-transparent`}
      initial={{ y: -80, opacity: 0 }}
      animate={introReady ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <figure className="h-20 p-3">
              <Logo />
            </figure>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {(isAuthenticated ? authNavItems : navItems).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-white bg-[var(--color-primary-normal)]"
                      : "text-white hover:bg-[var(--color-primary-normal)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions (no theme toggle, only auth button) */}
          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-normal)] rounded-lg hover:bg-[var(--color-primary-normal-hover)] transition-colors duration-200 shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary-normal)] rounded-lg hover:bg-[var(--color-primary-normal-hover)] transition-colors duration-200 shadow"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (solid white background, no dark mode) */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="space-y-2">
            {(isAuthenticated ? authNavItems : navItems).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary-normal)]"
                      : "text-gray-700 hover:bg-[var(--color-primary-light)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            {/* Mobile auth button */}
            <div className="pt-3 border-t border-gray-200">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;