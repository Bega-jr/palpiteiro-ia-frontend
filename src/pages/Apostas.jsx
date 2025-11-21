import React, { useState } from "react";
import { api } from "../services/api";
import "./Apostas.css";

function Apostas() {
  const [tipo, setTipo] = useState("aleatorio");
  const [palpites, setPalpites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const gerarPalpites = async () => {
    setLoading(true);
    setErro("");
    try {
      const data = await api.get(`/apostas/gerar?tipo=${tipo}`);
      setPalpites(data.palpites || []);
    } catch (e) {
      console.error(e);
      setErro("Erro ao gerar apostas.");
    }
    setLoading(false);
  };

  return (
    <div className="apostas-container">
      <h1>Gerador de Apostas</h1>

      <div className="seletor-tipo">
        <label>Tipo de geração:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="aleatorio">Aleatório</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <button className="btn-gerar" onClick={gerarPalpites} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Apostas"}
      </button>

      {erro && <p className="erro">{erro}</p>}

      <div className="lista-apostas">
        {palpites.length === 0 && !loading && (
          <p>Nenhuma aposta gerada ainda.</p>
        )}

        {palpites.map((jogo, index) => (
          <div key={index} className="aposta-card">
            <h3>Jogo {index + 1}</h3>
            <p>{jogo.join(" - ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apostas;
