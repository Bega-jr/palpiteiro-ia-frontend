// ARQUIVO: pages/Home.js

import React, { useState } from "react";
import { api } from "../services/api";
import "./Home.css";

function Home() {
  const [tipoAposta, setTipoAposta] = useState("aleatorio");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  // Estado para armazenar o array de apostas: [[n1, n2,...], [n1, n2,...]]
  const [apostas, setApostas] = useState([]); 

  const gerarApostas = async () => {
    try {
      setErro("");
      setLoading(true);
      setApostas([]); // Limpa as apostas anteriores

      // Chamada à API (o token será injetado pelo interceptor!)
      const response = await api.get(`/apostas/gerar?tipo=${tipoAposta}`);
      
      // Axios retorna os dados em response.data
      const data = response.data; 
      
      if (data && Array.isArray(data.apostas)) {
        setApostas(data.apostas);
      } else {
        setErro("Resposta inválida da API. Verifique o formato.");
      }
    } catch (err) {
      // Captura erros de rede, timeout e status HTTP 4xx/5xx
      const mensagemErro = err.response?.data?.message || "Erro ao gerar apostas. Verifique a conexão com a API.";
      setErro(mensagemErro);
      console.error("Detalhes do erro:", err);
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Palpiteiro IA - Lotofácil</h1>

      <div className="controls">
        <label htmlFor="select-aposta">Selecione o tipo de aposta:</label>
        <select 
          id="select-aposta" 
          value={tipoAposta} 
          onChange={(e) => setTipoAposta(e.target.value)}
        >
          <option value="aleatorio">Aleatório</option>
          <option value="estatistico">Estatístico</option>
        </select>

        <button onClick={gerarApostas} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Apostas"}
        </button>
      </div>

      {/* Exibição do Erro */}
      {erro && <p className="erro">{erro}</p>}

      {/* Renderização das Apostas Sugeridas (Melhoria de UX) */}
      <div className="apostas-lista">
        {apostas.map((jogo, index) => (
          // Usando index como fallback, mas idealmente use um ID único do jogo
          <div key={index} className="aposta-card palpite"> 
            <strong>Aposta Sugerida #{index + 1}:</strong>
            
            {/* CORREÇÃO: Renderiza os números como "bolas" */}
            <div className="palpite-container"> 
              {jogo.map((numero, numIndex) => (
                <span key={numIndex} className="palpite-span">
                  {numero}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
