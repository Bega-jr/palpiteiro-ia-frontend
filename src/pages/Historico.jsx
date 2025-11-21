// ARQUIVO: pages/Historico.jsx (CÓDIGO FINAL)

import React, { useState, useEffect } from "react";
// Importa o serviço configurado (com o interceptor do token)
import { api } from "../services/api"; 
import NumeroBolinha from "../components/NumeroBolinha";

function Historico() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null); // Para exibir erros ao usuário

  const carregarHistorico = async () => {
    try {
      setLoading(true);
      setErro(null); // Limpa erros anteriores
      
      // 🚨 CORREÇÃO DE SEGURANÇA: Usando a instância 'api' (Axios com Token)
      const response = await api.get("/historico"); 
      const data = response.data; 
      
      if (Array.isArray(data.sorteios)) {
         // O método sort é opcional, dependendo de como o backend retorna
        setHistorico(data.sorteios.sort((a, b) => b.concurso - a.concurso));
      } else {
        setErro("Formato de dados inválido da API.");
        setHistorico([]);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      const msg = error.response?.data?.message || "Erro de conexão com o servidor.";
      setErro(msg);
      setHistorico([]);
    } finally {
      setLoading(false);
    }
  };

  // 🚨 CORREÇÃO DE UX/PERFORMANCE: Carrega dados automaticamente
  useEffect(() => {
    carregarHistorico();
  }, []); 

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Últimos Sorteios</h1>

      {/* Botão agora serve apenas para RECARREGAR o histórico */}
      <button
        onClick={carregarHistorico}
        disabled={loading}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-purple-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Carregando..." : "Recarregar Histórico"}
      </button>

      {/* Feedback Visual */}
      {erro && <p className="mt-6 text-red-600 font-semibold">{erro}</p>}
      
      {historico.length > 0 && (
        <div className="mt-8 space-y-6">
          {historico.map((item) => (
            // 🚨 CORREÇÃO DE KEY: Usando o número do concurso como chave única
            <div key={item.concurso} className="bg-white p-6 rounded-lg shadow"> 
              <p className="text-xl">
                <strong>Concurso:</strong> {item.concurso}
                <span className="ml-4 text-gray-500">
                  Data: {item.data}
                </span>
              </p>
              
              <div className="flex justify-center flex-wrap gap-3 mt-4">
                {item.numeros?.map((n) => (
                  <NumeroBolinha key={n} numero={n} dark />
                ))}
              </div>
              
              {/* Espaço para exibir informações de premiação, se existirem */}
              {item.premiacao && (
                <p className="text-sm mt-4 text-center text-gray-600">
                  Ganhadores de 15 pontos: {item.premiacao.quinze_pontos || 'N/A'}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;
