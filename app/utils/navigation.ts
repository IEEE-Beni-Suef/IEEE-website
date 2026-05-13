class NavigationService {
  private navigate: ((to: string) => void) | null = null;

  setNavigate(navigateFn: (to: string) => void) {
    this.navigate = navigateFn;
  }

  navigateTo(path: string) {
    if (this.navigate) {
      try {
        this.navigate(path);
      } catch (error) {
        console.warn(
          "React Router navigation failed, falling back to window.location:",
          error
        );
        this.fallbackNavigation(path);
      }
    } else {
      console.warn(
        "React Router navigate not available, using window.location fallback"
      );
      this.fallbackNavigation(path);
    }
  }

  private fallbackNavigation(path: string) {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  }

  isInitialized(): boolean {
    return this.navigate !== null;
  }
}

export const navigationService = new NavigationService();
