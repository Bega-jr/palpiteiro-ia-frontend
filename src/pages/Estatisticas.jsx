import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Estatisticas.css";

function Estatisticas() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await api.get("/estatisticas");
        setStats(data);
      } catch (e) {
        setErro("Erro ao carregar estatísticas.");
        console.error(e);
      }
      setLoading(false);
    };

    carregar();
  }, []);

  if (loading) return <p>Carregando estatísticas...</p>;

  if (erro) return <p className="erro">{erro}</p>;

  return (
    <div className="estatisticas-container">
      <h1>Estatísticas Atualizadas</h1>

      {!stats ? (
        <p>Nenhuma estatística disponível.</p>
      ) : (
        <div className="stats-grid">

          <div className="stats-card">
            <h2>Mais Frequentes</h2>
            {stats.mais_frequentes?.map(([n, f], i) => (
              <p key={i}>
                <strong>{n}</strong> → {f}x
              </p>
            ))}
          </div>

          <div className="stats-card">
            <h2>Menos Frequentes</h2>
            {stats.menos_frequentes?.map(([n, f], i) => (
              <p key={i}>
                <strong>{n}</strong> → {f}x
              </p>
            ))}
          </div>

          <div className="stats-card">
            <h2>Atrasados</h2>
            {stats.atrasados?.map(([n, atraso], i) => (
              <p key={i}>
                <strong>{n}</strong> → {atraso} concursos
              </p>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

export default Estatisticas;
