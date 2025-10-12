import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

// get theme from local storage
const getThemeFromStorage = (): boolean => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

// Apply theme to HTML element
const applyThemeToHTML = (isDark: boolean) => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }
};

// Save theme to localStorage
const saveThemeToStorage = (isDark: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
};

const initialState: ThemeState = {
  isDark: getThemeFromStorage(),
};

// Apply initial theme to HTML
applyThemeToHTML(initialState.isDark);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      applyThemeToHTML(state.isDark);
      saveThemeToStorage(state.isDark);
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
      applyThemeToHTML(state.isDark);
      saveThemeToStorage(state.isDark);
    },
    initializeTheme: (state) => {
      state.isDark = getThemeFromStorage();
      applyThemeToHTML(state.isDark);
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
