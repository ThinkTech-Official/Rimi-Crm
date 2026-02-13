// import axios from "axios";
// import Cookies from "js-cookie";
// import { API_BASE } from "./urls";
// ;

// export const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
// });


// =========================




import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { API_BASE } from "./urls";
import { store } from "../app/store";
import { logout, setAccessToken } from "../features/authSlice";

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});


// TOKEN REFRESH 


let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


// RESPONSE INTERCEPTOR


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { 
      _retry?: boolean 
    };

    // If not a 401 error, just reject
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // If already retried, reject
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If the refresh endpoint itself failed, logout immediately
    if (originalRequest.url?.includes('/auth/refresh')) {
      console.error('Refresh token expired or invalid');
      store.dispatch(logout());
      
      // Save current path for redirect after re-login
      const currentPath = window.location.pathname;
      // window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
      window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;
      
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Mark as retrying
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log('Access token expired, refreshing...');
      
      // Call refresh endpoint
      const { data } = await axios.post(
        `${API_BASE}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = data.accessToken;

      // Update Redux store with new token
      store.dispatch(setAccessToken(newAccessToken));

      console.log('Access token refreshed successfully');

      // Process queued requests
      processQueue(null, newAccessToken);

      // Retry original request
      return axiosInstance(originalRequest);
      
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      
      // Refresh failed - logout user
      processQueue(refreshError, null);
      store.dispatch(logout());
      
      // Redirect to login with return URL
      const currentPath = window.location.pathname;
      // window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
      window.location.href = `/login?returnUrl=${encodeURIComponent(currentPath)}&sessionExpired=true`;
      
      return Promise.reject(refreshError);
      
    } finally {
      isRefreshing = false;
    }
  }
);