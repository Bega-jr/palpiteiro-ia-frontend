// ARQUIVO: pages/GerarAvancado.jsx (CÓDIGO FINAL)

import React, { useState } from 'react';
// 🚨 CORREÇÃO: Importamos a instância 'api' (garante o token)
import { api } from '../services/api'; 
import LoadingSkeleton from '../components/LoadingSkeleton';
import PalpiteGrid from '../components/PalpiteGrid';
// 🚨 CORREÇÃO: Removida a importação de MainLayout, pois ele é o wrapper no App.js

export default function GerarAvancado() {
  const [apostas, setApostas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('premium');
  const [erro, setErro] = useState(null);

  const gerar = async () => {
    setLoading(true);
    setErro(null);
    setApostas([]);
    
    try {
      const endpoints = [
        `/gerar_palpites?tipo=${tipo}`,
        `/gerar_apostas?tipo=${tipo}`,
        `/gerar-apostas?tipo=${tipo}`
      ];
      let jogos = [];

      // 🚨 CORREÇÃO: Lógica para tentar múltiplos endpoints
      for (const ep of endpoints) {
        try {
          const res = await api.get(ep);
          const data = res.data;
          
          if (data && (data.palpites || data.apostas)) {
            jogos = data.palpites || data.apostas;
            break; // Sucesso, sai do loop
          }
        } catch (e) { 
          console.warn(`Tentativa falhou no endpoint ${ep}:`, e.message);
          // Continua para o próximo endpoint
        } 
      }

      if (jogos.length === 0) {
        throw new Error('O backend não retornou nenhuma aposta válida.');
      }

      setApostas(jogos);
      
    } catch (e) {
      console.error("Erro fatal ao gerar avançado:", e);
      setErro(`Erro ao gerar apostas avançadas: ${e.message}`);
    }
    
    setLoading(false);
  };

  return (
    // 🚨 CORREÇÃO: Não encapsula MainLayout
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
          <button 
            onClick={gerar} 
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Gerando...' : 'Gerar'}
          </button>
        </div>
      </div>
      
      {erro && <div className="text-red-600 font-semibold">{erro}</div>}

      <div className="space-y-4">
        {loading && <LoadingSkeleton />}
        {!loading && apostas.length === 0 && !erro && (
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
  );
}
