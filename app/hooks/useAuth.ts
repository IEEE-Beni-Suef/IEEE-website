import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/lib/api";

// Cookie constants
const AUTH_COOKIE = "auth_token";
const USER_ID_COOKIE = "user_id";

// Event system for cross-component auth updates
const authListeners = new Set<() => void>();
const notifyAuthChange = () => authListeners.forEach((fn) => fn());

// Cookie utilities
const setCookie = (name: string, value: string, days = 15) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name: string) =>
  document.cookie.match(new RegExp(`${name}=([^;]+)`))?.[1] || "";

// Auth storage operations
const getAuthFromCookies = () => {
  const token = getCookie(AUTH_COOKIE);
  const userId = getCookie(USER_ID_COOKIE);
  return {
    token,
    userId: userId ? Number(userId) : null,
  };
};

export const saveAuth = (token: string, userId: number) => {
  setCookie(AUTH_COOKIE, token);
  setCookie(USER_ID_COOKIE, String(userId));
  notifyAuthChange();
};

export const clearAuth = () => {
  setCookie(AUTH_COOKIE, "", -1);
  setCookie(USER_ID_COOKIE, "", -1);
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
    enabled: !!(auth.token && auth.userId),
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...userQuery,
    ...auth,
    user: userQuery.data,
    isAuthenticated: !!(auth.token && auth.userId),
  };
};
