import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/lib/api";

// Cookie constants
const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const USER_ID_COOKIE = "user_id";

// Event system for cross-component auth updates
const authListeners = new Set<() => void>();
const notifyAuthChange = () => authListeners.forEach((fn) => fn());

// Cookie utilities
const setCookie = (name: string, value: string, days = 15) => {
  if (typeof document !== "undefined") {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
};

export const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    return document.cookie.match(new RegExp(`${name}=([^;]+)`))?.[1] || "";
  }
  return "";
};

// Auth storage operations
const getAuthFromCookies = () => {
  const accessToken = getCookie(ACCESS_COOKIE);
  const refreshToken = getCookie(REFRESH_COOKIE);
  const userId = getCookie(USER_ID_COOKIE);
  return {
    accessToken,
    refreshToken,
    userId: userId ? Number(userId) : null,
  };
};

export const saveAuth = (
  accessToken: string,
  refreshToken: string,
  userId: number
) => {
  setCookie(ACCESS_COOKIE, accessToken);
  setCookie(REFRESH_COOKIE, refreshToken);
  setCookie(USER_ID_COOKIE, String(userId));
  notifyAuthChange();
};

export const clearAuth = () => {
  setCookie(ACCESS_COOKIE, "", -1);
  setCookie(USER_ID_COOKIE, "", -1);
  setCookie(REFRESH_COOKIE, "", -1);
  notifyAuthChange();
};

export const useAuth = () => {
  const [auth, setAuth] = useState(getAuthFromCookies);

  // Listen for auth changes
  useEffect(() => {
    const handleChange = () => setAuth(getAuthFromCookies());
    authListeners.add(handleChange);
    return () => {
      authListeners.delete(handleChange);
    };
  }, []);

  // Fetch user data
  const userQuery = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: () => getUser(auth.userId!),
    enabled: !!(auth.accessToken && auth.userId),
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...userQuery,
    ...auth,
    user: userQuery.data,
    isAuthenticated: !!(auth.accessToken && auth.userId),
  };
};
