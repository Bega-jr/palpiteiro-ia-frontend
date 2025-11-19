import { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import MainLayout from '../layouts/MainLayout';

export default function Historico() {
  const [historico, setHistorico] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // backend may not have explicit /historico; if not, fallback to /estatisticas for data
        const res = await api.get('/historico').catch(() => api.get('/estatisticas'));
        setHistorico(res);
      } catch (e) {
        console.error(e);
        setHistorico({ error: 'Não foi possível carregar histórico' });
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <MainLayout>
      <div className="container space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Histórico de Concursos</h1>

        {loading && <LoadingSkeleton />}

        {!loading && historico?.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-800">
            {historico.error}
          </div>
        )}

        {!loading && !historico?.error && (
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-4 text-sm text-gray-600">Se o backend fornecer lista de concursos, serão exibidos aqui.</p>

            {/* If backend returned concursos list (API fallback), try to show */}
            {Array.isArray(historico) ? (
              <div className="space-y-4">
                {historico.map((c, idx) => (
                  <div key={idx} className="p-2 border rounded">
                    <div className="text-sm text-gray-500">Concurso: {c.numero || c.concurso || '—'}</div>
                    <div className="flex gap-2 mt-2">
                      {(c.listaDezenas || c.dezenas || []).map((d,i) => (
                        <div key={i} className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-medium">
                          {String(d).padStart(2,'0')}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-700">
                Nenhum histórico detalhado disponível via API. Use a rota /estatisticas para estatísticas gerais.
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
