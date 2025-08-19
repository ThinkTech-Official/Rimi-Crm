import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE } from "./urls";
;

export const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Automatically attach token from cookies
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});