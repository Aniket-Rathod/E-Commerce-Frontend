import axios from "axios";

// ✅ Detect environment dynamically
let API_BASE_URL;

//  If Vite env variable exists, use it
if (import.meta.env?.VITE_API_BASE_URL) {
  API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  Else, fall back to NODE_ENV logic
} else if (process.env.NODE_ENV === "production") {
  API_BASE_URL = "https://e-commerce-backend-production-96b2.up.railway.app"; // Railway backend

// Else, default to localhost for development
} else {
  API_BASE_URL = "http://localhost:8080";
}

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT if available
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
