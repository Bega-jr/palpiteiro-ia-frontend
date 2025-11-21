import React, { useState } from "react";

function Estatisticas({ API_URL }) {
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(false);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/estatisticas`);
      const data = await res.json();
      setEstatisticas(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Estatísticas</h1>

      <button
        onClick={carregarEstatisticas}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-xl"
      >
        Carregar Estatísticas
      </button>

      {loading && <p className="mt-6 text-xl text-gray-700">Carregando...</p>}

      {estatisticas && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow text-left">
          <p>
            <strong>Mais Frequentes:</strong>{" "}
            {estatisticas.mais_frequentes.map((i) => i[0]).join(", ")}
          </p>

          <p>
            <strong>Menos Frequentes:</strong>{" "}
            {estatisticas.menos_frequentes.map((i) => i[0]).join(", ")}
          </p>

          <p>
            <strong>Média da Soma:</strong> {estatisticas.media_soma}
          </p>
        </div>
      )}
    </div>
  );
}

export default Estatisticas;

