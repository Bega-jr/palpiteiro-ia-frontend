import { useState } from 'react';
import api from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PalpiteGrid from '../components/PalpiteGrid';
import MainLayout from '../layouts/MainLayout';

export default function GerarAvancado() {
  const [apostas, setApostas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('premium');

  const gerar = async () => {
    setLoading(true);
    try {
      // try multiple endpoints for compatibility
      const endpoints = [
        `/gerar_palpites?tipo=${tipo}`,
        `/gerar_apostas?tipo=${tipo}`,
        `/gerar-apostas?tipo=${tipo}`
      ];
      let res = null;
      for (const ep of endpoints) {
        try {
          res = await api.get(ep);
          if (res && (res.palpites || res.apostas)) break;
        } catch (e) { /* try next */ }
      }
      if (!res) throw new Error('Nenhuma resposta válida do backend');
      const jogos = res.palpites || res.apostas || [];
      setApostas(jogos);
    } catch (e) {
      console.error(e);
      alert('Erro ao gerar apostas avançadas');
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="container space-y-6">
        <h1 className="text-2xl font-bold">Gerar Apostas Avançado</h1>

        <div className="bg-white p-4 rounded shadow">
          <label className="block mb-2">Tipo:</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-2 rounded">
            <option value="aleatorio">Aleatório</option>
            <option value="premium">Premium</option>
            <option value="estatistico">Estatístico</option>
          </select>
          <div className="mt-4">
            <button onClick={gerar} className="px-4 py-2 bg-indigo-600 text-white rounded">Gerar</button>
          </div>
        </div>

        <div className="space-y-4">
          {loading && <LoadingSkeleton />}
          {!loading && apostas.length === 0 && (
            <div className="text-sm text-gray-600">Nenhuma aposta gerada ainda.</div>
          )}
          {!loading && apostas.map((j, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Jogo #{idx + 1}</div>
              </div>
              <div className="mt-3">
                <PalpiteGrid numbers={j} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
