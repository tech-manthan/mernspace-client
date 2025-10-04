"use client";

import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import * as jose from "jose";
import { toast } from "sonner";

const TokenRefresherProvider = ({ children }: { children: ReactNode }) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTokens = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/tokens");
      if (!res.ok) return;

      const { accessToken } = await res.json();
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  }, []);

  const startRefresh = useCallback(async () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);

    const token = await getTokens();
    if (!token) return;

    try {
      const decoded = jose.decodeJwt(token);
      const exp = decoded.exp ? decoded.exp * 1000 : 0;
      const now = Date.now();

      const refreshTime = exp - now - 5000;

      if (refreshTime <= 0) {
        console.warn("Access token expired or near expiry — refreshing now");
        await refreshAccessToken();
        return;
      }

      console.log(`Current Time: ${new Date(now).toISOString()}`);
      console.log(`Token Expiry: ${new Date(exp).toISOString()}`);
      console.log(
        `Next Refresh Scheduled: ${new Date(now + refreshTime).toISOString()}`
      );

      timeoutId.current = setTimeout(refreshAccessToken, refreshTime);
    } catch (error) {
      console.error(error);
    }
  }, [getTokens]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST" });
      const data = await res.json();

      if (!res.ok || data.type === "error") {
        toast.error(data?.message || "Failed to refresh access token");
        return;
      }

      // Successfully refreshed, schedule next refresh
      await startRefresh();
    } catch (error) {
      console.error(error);
    }
  }, [startRefresh]);

  useEffect(() => {
    startRefresh();

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [startRefresh]);

  return <>{children}</>;
};

export default TokenRefresherProvider;
