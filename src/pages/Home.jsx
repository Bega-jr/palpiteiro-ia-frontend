import { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Home() {
  const [palpite, setPalpite] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerar = async (tipo) => {
    setLoading(true);

    // Novo endpoint correto
    const res = await api.get(`/gerar-apostas?tipo=${tipo}`);

    // Ajuste conforme retorno do backend
    setPalpite(res.apostas?.[0] || []);

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Seu Palpite</h2>
        {loading ? <LoadingSkeleton /> : (
          <div className="flex flex-wrap justify-center gap-2">
            {palpite?.map(n => (
              <span key={n} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {n.toString().padStart(2, '0')}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => gerar('aleatorio')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Aleatório
          </button>
          <button onClick={() => gerar('estatistico')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Estatístico
          </button>
        </div>
      </section>
    </div>
  );
}
