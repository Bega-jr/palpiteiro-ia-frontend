import axios from 'axios';
import { auth } from './firebase'; // Importa o objeto auth do firebase.js

// A URL de backend mockada/placeholder
const API_BASE_URL = 'http://localhost:5000/api'; 

// Cria uma instância do Axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || API_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock para simular a chamada ao backend Flask para Estatísticas e Geração
// Isso garante que o frontend funcione mesmo sem um backend Flask rodando
if (api.defaults.baseURL.includes(API_BASE_URL)) {
    // 1. Adiciona o token de autenticação (MOCK)
    api.interceptors.request.use(config => {
        const user = auth.currentUser;
        if (user) {
            // Mocka a função para obter o token para a API. Em um ambiente real, você usaria user.getIdToken()
            config.headers.Authorization = `Bearer MOCK_TOKEN_${user.uid}`;
        }
        return config;
    });

    // 2. Mock para simular as respostas
    api.interceptors.response.use(response => response, error => {
        // Mock para /estatisticas
        if (error.config.url.endsWith('/estatisticas') || error.config.url.includes('/estatisticas?')) {
            return Promise.resolve({
                data: {
                    mais_sorteados: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
                    menos_sorteados: [2, 4, 6, 8, 10, 12],
                    frequencia: {
                        '01': 100, '02': 50, '03': 98, '04': 52, '05': 95, '06': 55, '07': 90, '08': 60,
                        '09': 88, '10': 62, '11': 85, '12': 65, '13': 80, '14': 70, '15': 75, '16': 72,
                        '17': 78, '18': 68, '19': 82, '20': 58, '21': 92, '22': 59, '23': 94, '24': 57, '25': 96
                    }
                }
            });
        }
        // Mock para /apostas/gerar
        if (error.config.url.startsWith('/apostas/gerar')) {
             const url = new URL(error.config.url, 'http://dummy.com');
             const quantidade = parseInt(url.searchParams.get('quantidade') || 1);
             
             const mockApostas = Array.from({ length: quantidade }, () => {
                 const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
                 // Gera 15 números aleatórios
                 return numbers.sort(() => 0.5 - Math.random()).slice(0, 15).sort((a, b) => a - b);
             });
             return Promise.resolve({ data: { apostas: mockApostas } });
        }
        return Promise.reject(error);
    });
}
