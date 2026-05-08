export const useTheme = () => {
  return {
    isDark: false,
    toggle: () => {},
    setDark: (_dark: boolean) => {},
    theme: "light",
  };
};
