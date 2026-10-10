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
  UserPlus,
} from "lucide-react";
import Logo from "./ui/Logo";

const Navbar = () => {
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

  // Updated nav items according to design specs
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Chapters", path: "/#chapters" },
    { label: "Committees", path: "/#committees" },
    { label: "About", path: "/about" },
    { label: "Achievements", path: "/#achievements" },
  ];

  const authNavItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Chapters", path: "/#chapters" },
    { label: "Committees", path: "/#committees" },
    { label: "About", path: "/about" },
    { label: "Achievements", path: "/#achievements" },
  ];

  const currentNavItems = isMounted && isAuthenticated ? authNavItems : navItems;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.hash === path || location.pathname === path;
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const logoColor = "#ECEFFD";

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#12111F]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
      initial={{ y: "-100%", opacity: 0 }}
      animate={
        introReady
          ? {
              y: 0,
              opacity: 1,
            }
          : { y: "-100%", opacity: 0 }
      }
      transition={{
        y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo 80*80 */}
          <Link to="/" className="flex items-center space-x-3 group">
            <figure className="w-[80px] h-[80px] flex items-center justify-center p-1">
              <Logo color={logoColor} />
            </figure>
          </Link>

          {/* Desktop Navigation Links */}
          <motion.div
            className="hidden md:flex items-center space-x-2 lg:space-x-3"
            variants={{
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
              hidden: {},
            }}
            initial="hidden"
            animate={introReady ? "visible" : "hidden"}
          >
            {currentNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center justify-center px-4 py-1.5 rounded-[12px] font-medium text-sm transition-all duration-200 ${
                      active
                        ? "bg-[#ECEFFD] text-[#4460EF] shadow-sm font-semibold"
                        : "text-[#ECEFFD] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Side Action Buttons */}
          <div className="flex items-center space-x-3">
            {!isMounted || !isAuthenticated ? (
              <>
                {/* Sign Up Button */}
                <Link
                  to="/register"
                  style={{
                    width: "105px",
                    height: "40px",
                    backgroundColor: "#ECEFFD",
                    color: "#4460EF",
                    borderRadius: "12px",
                    paddingTop: "16px",
                    paddingRight: "8px",
                    paddingBottom: "16px",
                    paddingLeft: "8px",
                    opacity: 1,
                  }}
                  className="hidden sm:inline-flex items-center justify-center text-sm font-semibold transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </Link>

                {/* Join IEEE Button */}
                <Link
                  to="/register"
                  style={{
                    height: "40px",
                    borderTop: "1.6px solid #FFFFFF73",
                    borderRight: "1.6px solid #FFFFFF73",
                    borderBottom: "1.6px solid #FFFFFF73",
                    borderLeft: "1.6px solid #FFFFFF73",
                    borderRadius: "12px",
                    paddingTop: "8px",
                    paddingRight: "16px",
                    paddingBottom: "8px",
                    paddingLeft: "16px",
                    color: "#FEFEFF",
                    backgroundColor: "transparent",
                    opacity: 1,
                  }}
                  className="hidden sm:inline-flex items-center justify-center text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Join IEEE
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                style={{
                  height: "40px",
                  borderTop: "1.6px solid #FFFFFF73",
                  borderRadius: "12px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  backgroundColor: "#ECEFFD",
                  color: "#4460EF",
                }}
                className="hidden sm:inline-flex items-center justify-center text-sm font-semibold transition-colors duration-200"
              >
                Log out
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#ECEFFD] hover:bg-white/10 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 bg-[#12111F] border-t border-white/10">
          <div className="space-y-2">
            {currentNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-2 rounded-[12px] text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#ECEFFD] text-[#4460EF]"
                      : "text-[#ECEFFD] hover:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-2 bg-[#ECEFFD] text-[#4460EF] font-semibold rounded-[12px]"
              >
                Sign Up
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-2 border-[1.6px] border-[#FFFFFF73] text-[#FEFEFF] font-medium rounded-[12px]"
              >
                Join IEEE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;