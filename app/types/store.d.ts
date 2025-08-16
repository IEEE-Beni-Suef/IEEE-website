export interface ThemeState {
  isDark: boolean;
}

export interface RootState {
  theme: ThemeState;
}

export interface ToggleThemeAction {
  type: "theme/toggleTheme";
}

export interface ThemeState {
  isDark: boolean;
}
export interface SetThemeAction {
  type: "theme/setTheme";
  payload: boolean;
}

export interface InitializeThemeAction {
  type: "theme/initializeTheme";
}

export type ThemeAction =
  | ToggleThemeAction
  | SetThemeAction
  | InitializeThemeAction;
