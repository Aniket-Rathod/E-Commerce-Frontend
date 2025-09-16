import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://ecommerce-backend-production-ff66.up.railway.app";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api, API_BASE_URL };
