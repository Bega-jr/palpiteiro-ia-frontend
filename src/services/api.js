// ARQUIVO: services/api.js

import axios from 'axios';
import { auth } from '../index'; // Importa a instância 'auth' exportada do index.jsx

// 1. Configuração da Instância do Axios
const api = axios.create({
  // Use o prefixo correto (VITE_ ou REACT_APP_)
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Requisição para Injetar o Token de Autenticação
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    try {
      // Obtém o token JWT do usuário logado no Firebase
      const token = await user.getIdToken(); 
      
      // Anexa o token ao cabeçalho 'Authorization' (padrão Bearer)
      config.headers.Authorization = `Bearer ${token}`; 

    } catch (error) {
      console.error("Erro ao obter o token Firebase:", error);
      // Se a obtenção do token falhar, a requisição seguirá sem o token, 
      // mas o backend deverá rejeitá-la.
    }
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api };
