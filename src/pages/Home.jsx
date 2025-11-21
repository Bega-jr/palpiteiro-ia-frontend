import React, { useState } from "react";
import { api } from "../services/api";
import "./Home.css";

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

      const data = await api.get(`/apostas/gerar?tipo=${tipoAposta}`);
      if (data?.apostas) {
        setApostas(data.apostas);
      } else {
        setErro("Nenhuma aposta retornada da API.");
      }
    } catch (err) {
      setErro("Erro ao gerar apostas.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="home-container">
      <h1>Palpiteiro IA</h1>

      <div className="controls">
        <label>Selecione o tipo de aposta:</label>
        <select value={tipoAposta} onChange={(e) => setTipoAposta(e.target.value)}>
          <option value="aleatorio">Aleatório</option>
          <option value="estatistico">Estatístico</option>
        </select>

        <button onClick={gerarApostas} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Apostas"}
        </button>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="apostas-lista">
        {apostas.map((jogo, index) => (
          <div key={index} className="aposta-card">
            <strong>Aposta {index + 1}:</strong>
            <p>{jogo.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

