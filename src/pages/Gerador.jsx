import React, { useState } from "react";
import "../styles/gerador.css";
import { api } from "../services/api";

export default function Gerador() {
  const [loading, setLoading] = useState(false);
  const [apostas, setApostas] = useState([]);

  const gerar = async () => {
    try {
      setLoading(true);
      const response = await api.get("/gerar-apostas");
      setApostas(response.data.apostas || []);
    } catch (error) {
      console.error("Erro ao gerar apostas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gerador-container">
      <h1>Gerador Inteligente</h1>

      <button className="gerar-btn" onClick={gerar} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Apostas"}
      </button>

      <div className="apostas-list">
        {apostas.length > 0 &&
          apostas.map((jogo, index) => (
            <div key={index} className="jogo-item">
              <strong>Jogo {index + 1}:</strong> {jogo.join(", ")}
            </div>
          ))}
      </div>
    </div>
  );
}
