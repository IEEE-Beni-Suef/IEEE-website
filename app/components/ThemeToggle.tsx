import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { toggleTheme } from "../store/slices/themeSlice";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        <div
          className={`absolute transition-transform duration-500 ${
            isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
          }`}
          suppressHydrationWarning
        >
          <Sun className="w-5 h-5" />
        </div>
        <div
          className={`absolute transition-transform duration-500 ${
            isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
          suppressHydrationWarning
        >
          <Moon className="w-5 h-5" />
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 dark:from-blue-600 dark:to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
    </button>
  );
};

export default ThemeToggle;
