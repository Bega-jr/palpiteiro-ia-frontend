// ARQUIVO: src/services/api.js

import axios from "axios";
import { auth } from "../index"; // Firebase Auth inicializado no index.jsx

// ========================================
// 1. BASE URL com fallback seguro
// ========================================
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://palpiteiro-ia-backend-docker.onrender.com";

// ========================================
// 2. Instância do Axios
// ========================================
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// 3. Interceptor → adiciona o token Firebase
// ========================================
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (e) {
        console.error("❌ Erro ao obter token Firebase:", e);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================================
// 4. Exportação
// ========================================
export { api };

