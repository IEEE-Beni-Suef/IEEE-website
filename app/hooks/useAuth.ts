import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "lib/api";

// Util functions for cookie handling
const AUTH_COOKIE = "auth_token";
const USER_ID_COOKIE = "user_id";

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function saveAuth(token: string, userId: number) {
  // persist in cookies
  setCookie(AUTH_COOKIE, token);
  setCookie(USER_ID_COOKIE, String(userId));
}

function readAuthFromStorage() {
  try {
    const token = getCookie(AUTH_COOKIE) || "";
    const userIdStr = getCookie(USER_ID_COOKIE) || "";
    const userId = userIdStr ? Number(userIdStr) : undefined;
    return { token, userId };
  } catch {
    return { token: "", userId: undefined };
  }
}

export const useAuth = () => {
  const [{ token, userId }] = useState(readAuthFromStorage());

  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId && !!token,
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, token, userId };
};
