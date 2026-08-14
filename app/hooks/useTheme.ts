import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "~/store/store";
import { toggleTheme, setTheme } from "~/store/slices/themeSlice";

export const useTheme = () => {
  return {
    isDark: false,
    toggle: () => {},
    setDark: (_dark: boolean) => {},
    theme: "light",
  };
};

