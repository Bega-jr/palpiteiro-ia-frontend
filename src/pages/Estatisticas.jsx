// ARQUIVO: pages/Estatisticas.jsx (CÓDIGO FINAL)

import React, { useState, useEffect } from "react";
// Importa o serviço configurado (com o interceptor do token)
import { api } from "../services/api";
import NumeroBolinha from "../components/NumeroBolinha"; // Para melhor visualização

// Função não precisa mais receber API_URL como prop
function Estatisticas() { 
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      setErro(null);
      
      // 🚨 CORREÇÃO: Usando a instância 'api' (Axios com Token)
      const response = await api.get("/estatisticas"); 
      
      setEstatisticas(response.data);
      
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      const msg = error.response?.data?.message || "Erro de conexão ao buscar estatísticas.";
      setErro(msg);
      setEstatisticas(null);
    } finally {
      setLoading(false);
    }
  };

  // 🚨 CORREÇÃO: Carrega as estatísticas automaticamente
  useEffect(() => {
    carregarEstatisticas();
  }, []); 

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Estatísticas da Lotofácil</h1>

      {/* Botão agora serve para RECARREGAR */}
      <button
        onClick={carregarEstatisticas}
        disabled={loading}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-indigo-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Carregando..." : "Recarregar Estatísticas"}
      </button>

      {/* Exibição de Erro */}
      {erro && <p className="mt-6 text-red-600 font-semibold">{erro}</p>}

      {estatisticas && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow text-left space-y-4">
          
          <div className="flex flex-wrap items-center">
            <strong className="mr-3 whitespace-nowrap">Mais Frequentes:</strong>{" "}
            {/* 🚨 CORREÇÃO: Usando NumeroBolinha para melhor visualização */}
            {estatisticas.mais_frequentes.map((item) => (
              <NumeroBolinha key={item[0]} numero={item[0]} dark className="mx-1" />
            ))}
          </div>

          <div className="flex flex-wrap items-center">
            <strong className="mr-3 whitespace-nowrap">Menos Frequentes:</strong>{" "}
            {/* 🚨 CORREÇÃO: Usando NumeroBolinha para melhor visualização */}
            {estatisticas.menos_frequentes.map((item) => (
              <NumeroBolinha key={item[0]} numero={item[0]} className="mx-1 bg-gray-300 text-gray-800" />
            ))}
          </div>

          <p className="border-t pt-3">
            <strong>Média da Soma:</strong> {estatisticas.media_soma}
          </p>

          <p className="text-sm text-gray-500">
            *Números entre parênteses indicam a frequência de sorteio.
          </p>
        </div>
      )}
    </div>
  );
}

export default Estatisticas;
