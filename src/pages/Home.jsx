import { useState } from 'react';
import api from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PalpiteGrid from '../components/PalpiteGrid';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
  const [palpite, setPalpite] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerar = async (tipo) => {
    setLoading(true);
    try {
      const res = await api.get(`/gerar_apostas?tipo=${tipo}`);

      if (res.apostas && res.apostas.length > 0) {
        setPalpite(res.apostas[0]);
      } else {
        setPalpite([]);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar palpites.");
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Seu Palpite</h2>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <PalpiteGrid numbers={palpite || []} />
          )}

          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => gerar('aleatorio')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Aleatório
            </button>

            <button
              onClick={() => gerar('estatistico')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Estatístico
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
