import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PalpiteGrid from '../components/PalpiteGrid';
import MainLayout from '../layouts/MainLayout';

export default function Estatisticas() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/estatisticas');
        setStats(res);
      } catch (e) {
        console.error('Erro ao buscar estatísticas:', e);
        setStats({ error: 'Não foi possível obter estatísticas' });
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <MainLayout>
      <div className="container space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Estatísticas — Lotofácil</h1>

        {loading && <LoadingSkeleton />}

        {!loading && stats?.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800">
            {stats.error}
          </div>
        )}

        {!loading && !stats?.error && (
          <div className="grid md:grid-cols-3 gap-6">
            <section className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-3">Mais frequentes (top 10)</h3>
              <div className="flex flex-wrap gap-2">
                {stats.mais_frequentes?.map(([n, c]) => (
                  <div key={n} className="px-3 py-2 bg-blue-50 rounded">
                    <strong>{String(n).padStart(2, '0')}</strong> — {c}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-3">Menos frequentes (top 10)</h3>
              <div className="flex flex-wrap gap-2">
                {stats.menos_frequentes?.map(([n, c]) => (
                  <div key={n} className="px-3 py-2 bg-yellow-50 rounded">
                    <strong>{String(n).padStart(2, '0')}</strong> — {c}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-3">Média das somas</h3>
              <div className="text-4xl font-bold text-indigo-600">
                {stats.media_soma ?? '—'}
              </div>
            </section>
          </div>
        )}

        <section className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-3">Visualização de um palpite (exemplo)</h3>
          <PalpiteGrid numbers={(stats?.mais_frequentes || []).slice(0, 15).map(a=>a[0])} />
        </section>
      </div>
    </MainLayout>
  );
}
