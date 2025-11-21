import React, { useState } from "react";
import NumeroBolinha from "../components/NumeroBolinha";

function Historico({ API_URL }) {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarHistorico = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/historico`);
      const data = await res.json();
      setHistorico(data.sorteios || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Últimos Sorteios</h1>

      <button
        onClick={carregarHistorico}
        className="bg-purple-600 text-white px-8 py-3 rounded-lg text-xl"
      >
        Carregar Histórico
      </button>

      {loading && <p className="mt-6 text-xl">Carregando...</p>}

      {historico.length > 0 && (
        <div className="mt-8 space-y-6">
          {historico.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <p className="text-xl">
                <strong>Concurso:</strong> {item.concurso}
              </p>
              <p className="text-xl">
                <strong>Data:</strong> {item.data}
              </p>

              <div className="flex justify-center flex-wrap gap-3 mt-4">
                {item.numeros?.map((n) => (
                  <NumeroBolinha key={n} numero={n} dark />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;
