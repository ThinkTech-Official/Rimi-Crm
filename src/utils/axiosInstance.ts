// import axios from "axios";
// import Cookies from "js-cookie";
// import { API_BASE } from "./urls";
// ;

// export const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });

// =========================

// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import Cookies from "js-cookie";
// import { API_BASE } from "./urls";
// import { store } from "../app/store";
// import { logout, setAccessToken } from "../features/authSlice";

// export const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });

// // TOKEN REFRESH

// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: any) => void;
//   reject: (reason?: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // RESPONSE INTERCEPTOR

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean
//     };

//     // If not a 401 error, just reject
//     if (error.response?.status !== 401) {
//       return Promise.reject(error);
//     }

//     // If already retried, reject
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // If the refresh endpoint itself failed, logout immediately
//     if (originalRequest.url?.includes('/auth/refresh')) {
//       console.error('Refresh token expired or invalid');
//       store.dispatch(logout());

//       // Save current path for redirect after re-login
//       const currentPath = window.location.pathname;
//       // window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
//       window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;

//       return Promise.reject(error);
//     }

//     // If already refreshing, queue this request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//         .then(() => {
//           return axiosInstance(originalRequest);
//         })
//         .catch((err) => {
//           return Promise.reject(err);
//         });
//     }

//     // Mark as retrying
//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       console.log('Access token expired, refreshing...');

//       // Call refresh endpoint
//       const { data } = await axios.post(
//         `${API_BASE}/auth/refresh`,
//         {},
//         { withCredentials: true }
//       );

//       const newAccessToken = data.accessToken;

//       // Update Redux store with new token
//       store.dispatch(setAccessToken(newAccessToken));

//       console.log('Access token refreshed successfully');

//       // Process queued requests
//       processQueue(null, newAccessToken);

//       // Retry original request
//       return axiosInstance(originalRequest);

//     } catch (refreshError) {
//       console.error('Token refresh failed:', refreshError);

//       // Refresh failed - logout user
//       processQueue(refreshError, null);
//       store.dispatch(logout());

//       // Redirect to login with return URL
//       const currentPath = window.location.pathname;
//       // window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
//       window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;

//       return Promise.reject(refreshError);

//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// ==============================

// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { API_BASE } from "./urls";
// import { store } from "../app/store";
// import { logout, setAccessToken } from "../features/authSlice";

// export const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });

// // TOKEN REFRESH QUEUE

// let isRefreshing = false;
// let failedQueue: Array<{
//   resolve: (value?: any) => void;
//   reject: (reason?: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // RESPONSE INTERCEPTOR

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean
//     };

//     if (error.response?.status !== 401) {
//       return Promise.reject(error);
//     }

//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     if (originalRequest.url?.includes('/auth/me')) {
//       return Promise.reject(error);
//     }

//     if (originalRequest.url?.includes('/auth/refresh')) {
//       console.error('Refresh token expired or invalid');
//       store.dispatch(logout());

//       const currentPath = window.location.pathname;
//       window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;

//       return Promise.reject(error);
//     }

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {

//         const timeout = setTimeout(() => {
//           reject(new Error('Token refresh timeout'));
//         }, 10000); // 10 second timeout

//         failedQueue.push({
//           resolve: () => {
//             clearTimeout(timeout);
//             resolve(axiosInstance(originalRequest));
//           },
//           reject: (err) => {
//             clearTimeout(timeout);
//             reject(err);
//           }
//         });
//       });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       console.log('Access token expired, refreshing...');

//       const { data } = await axios.post(
//         `${API_BASE}/auth/refresh`,
//         {},
//         { withCredentials: true }
//       );

//       const newAccessToken = data.accessToken;

//       store.dispatch(setAccessToken(newAccessToken));

//       console.log('Access token refreshed successfully');

//       processQueue(null, newAccessToken);

//       return axiosInstance(originalRequest);

//     } catch (refreshError) {
//       console.error('Token refresh failed:', refreshError);

//       processQueue(refreshError, null);
//       store.dispatch(logout());

//       const currentPath = window.location.pathname;
//       window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;

//       return Promise.reject(refreshError);

//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// ======================================

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE } from "./urls";
import { store } from "../app/store";
import { logout, setAccessToken } from "../features/authSlice";
import { clearVerificationData } from "../features/verificationSlice";
import { initializeAuth } from "../features/authSlice";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

const LAST_REFRESH_KEY = "rimi_last_refresh";
const REFRESH_FAILED_KEY = "rimi_refresh_failed";
const GRACE_MS = 10_000; // 10 seconds

function wasRefreshRecentlySuccessful(): boolean {
  try {
    const t = parseInt(localStorage.getItem(LAST_REFRESH_KEY) || "0", 10);
    return Date.now() - t < GRACE_MS;
  } catch {
    return false;
  }
}

function wasRefreshRecentlyFailed(): boolean {
  try {
    const t = parseInt(localStorage.getItem(REFRESH_FAILED_KEY) || "0", 10);
    return Date.now() - t < GRACE_MS;
  } catch {
    return false;
  }
}

function recordRefreshSuccess() {
  try {
    localStorage.setItem(LAST_REFRESH_KEY, Date.now().toString());
    localStorage.removeItem(REFRESH_FAILED_KEY);
  } catch {}
}

function recordRefreshFailure() {
  try {
    localStorage.setItem(REFRESH_FAILED_KEY, Date.now().toString());
    localStorage.removeItem(LAST_REFRESH_KEY);
  } catch {}
}

function withRefreshLock(fn: () => Promise<void>): Promise<void> {
  if (typeof navigator !== "undefined" && "locks" in navigator) {
    return navigator.locks.request<void>("rimi_token_refresh", async (lock) => {
      await fn();
    });
  }
  return fn();
}

function clearAuthState() {
  store.dispatch(logout());
  store.dispatch(clearVerificationData());
}

function redirectToLogin() {
  if (!window.location.pathname.startsWith("/login")) {
    const returnUrl = encodeURIComponent(window.location.pathname);
    window.location.href = `/login?returnUrl=${returnUrl}&sessionExpired=true`;
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) return Promise.reject(error);

    const url = originalRequest.url ?? "";
    if (
      url.includes("/auth/me") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) return Promise.reject(error);

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            originalRequest._retry = true;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await withRefreshLock(async () => {
        // if (wasRefreshRecentlySuccessful()) {
        //   console.log("[Auth] Already refreshed by another tab — skipping");
        //   return;
        // }

        if (wasRefreshRecentlySuccessful()) {
          console.log(
            "[Auth] Already refreshed by another tab — syncing Redux state",
          );
          await store.dispatch(initializeAuth());
          return;
        }

        if (wasRefreshRecentlyFailed()) {
          console.log(
            "[Auth] Refresh already failed in another tab — skipping",
          );
          throw new Error("Refresh token expired");
        }

        console.log("[Auth] Refreshing access token...");
        const { data } = await axios.post(
          `${API_BASE}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        store.dispatch(setAccessToken(data.accessToken));
        recordRefreshSuccess();
        console.log("[Auth] Token refreshed successfully");
      });

      processQueue(null);
      return axiosInstance(originalRequest);
    } catch (err) {
      recordRefreshFailure();
      processQueue(err);

      clearAuthState();
      redirectToLogin();

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
