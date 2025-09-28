import axios from "axios";
// import { useAuthStore } from "../store/auth.store";

export const AUTH_SERVICE = "api/auth";
export const CATALOG_SERVICE = "api/catalog";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${process.env.BACKEND_URL}/${AUTH_SERVICE}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true;

        const headers = { ...originalRequest?.headers };
        await refreshToken();

        return api.request({
          ...originalRequest,
          headers,
        });
      } catch (err) {
        console.error("Token refresh error", err);
        // useAuthStore.getState().removeUser();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
