import axios from "axios";
import Cookies from "js-cookie";

const API = "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API,
});

// Automatically attach token from cookies
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});