// ARQUIVO: pages/Home.js (CONVERTIDO PARA TAILWIND)

import React, { useState } from "react";
// 🚨 REMOÇÃO: Não precisa importar "./Home.css"
import { api } from "../services/api";
// Importamos o PalpiteGrid, pois é o componente padrão para exibir as bolinhas
import PalpiteGrid from "../components/PalpiteGrid"; 
// Se você não tiver o PalpiteGrid, precisará re-implementar a lógica de renderização
// dentro da Home.

function Home() {
  const [tipoAposta, setTipoAposta] = useState("aleatorio");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [apostas, setApostas] = useState([]); 

  const gerarApostas = async () => {
    try {
      setErro("");
      setLoading(true);
      setApostas([]);

      const response = await api.get(`/apostas/gerar?tipo=${tipoAposta}`);
      const data = response.data; 
      
      if (data && Array.isArray(data.apostas)) {
        setApostas(data.apostas);
      } else {
        setErro("Resposta inválida da API. Verifique o formato.");
      }
    } catch (err) {
      const mensagemErro = err.response?.data?.message || "Erro ao gerar apostas. Verifique a conexão com a API.";
      setErro(mensagemErro);
      console.error("Detalhes do erro:", err);
    }
    setLoading(false);
  };

  return (
    {/* 🚨 CONVERSÃO: home-container -> Tailwind classes */}
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Palpiteiro IA - Lotofácil</h1>

      {/* 🚨 CONVERSÃO: controls -> Tailwind classes */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <label htmlFor="select-aposta" className="block text-lg font-semibold mb-3">
            Selecione o tipo de aposta:
        </label>
        <select 
          id="select-aposta" 
          value={tipoAposta} 
          onChange={(e) => setTipoAposta(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg text-lg mr-4"
        >
          <option value="aleatorio">Aleatório</option>
          <option value="estatistico">Estatístico</option>
        </select>

        <button 
            onClick={gerarApostas} 
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition duration-150 mt-4 md:mt-0"
        >
          {loading ? "Gerando..." : "Gerar Apostas"}
        </button>
      </div>

      {/* 🚨 CONVERSÃO: erro -> Tailwind classes */}
      {erro && <p className="text-red-600 font-semibold mb-6">{erro}</p>}

      {/* 🚨 CONVERSÃO: apostas-lista -> Tailwind classes */}
      <div className="space-y-6">
        {apostas.map((jogo, index) => (
          {/* 🚨 CONVERSÃO: aposta-card palpite -> Tailwind classes */}
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-left">
            <strong className="text-xl block mb-3">Aposta Sugerida #{index + 1}:</strong>
            
            {/* 🚨 MELHORIA: Substituímos o span/Home.css pelo componente PalpiteGrid */}
            <PalpiteGrid numbers={jogo} /> 

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
