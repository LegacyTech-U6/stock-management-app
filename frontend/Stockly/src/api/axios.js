// src/api/axios.js
import axios from "axios";
import { useAuthStore } from "@/stores/authStore"; // adapte le chemin selon ton projet

const API = axios.create({
  baseURL: "http://localhost:4000/api", // ton backend
});

// Intercepteur pour ajouter le token automatiquement
API.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
