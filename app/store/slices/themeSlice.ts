import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.isDark ? "dark" : "light");
      }
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload ? "dark" : "light");
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          state.isDark = true;
        }
      }
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;

