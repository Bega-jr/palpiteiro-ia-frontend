import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./index"; // se o auth estiver exportado no index.js

function App() {
  const [user, setUser] = useState(null);
  const [palpite, setPalpite] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const gerarPalpite = async (tipo = "aleatorio") => {
    setLoading(true);
    const token = await auth.currentUser.getIdToken();
    const res = await fetch(`${API_URL}/gerar_palpites?tipo=${tipo}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setPalpite(data.palpites[0] || []);
    setLoading(false);
  };

  const carregarHistorico = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/historico`);
    const data = await res.json();
    setHistorico(data.sorteios || []);
    setLoading(false);
  };

  const carregarEstatisticas = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/estatisticas`);
    const data = await res.json();
    setEstatisticas(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Palpiteiro IA</h1>
        {user ? (
          <div className="mt-4">
            <span className="mr-4">Olá, {user.displayName}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Sair</button>
          </div>
        ) : (
          <button onClick={login} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-xl mt-4">
            Login com Google
          </button>
        )}
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {user ? (
          <>
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Aposta Sugerida</h2>
              <div className="flex justify-center gap-4 flex-wrap">
                {palpite.length > 0 ? palpite.map(n => (
                  <div key={n} className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                    {n.toString().padStart(2, "0")}
                  </div>
                )) : <p className="text-gray-600">Clique em um botão para gerar seu palpite</p>}
              </div>
              <div className="text-center mt-6 space-x-4">
                <button onClick={() => gerarPalpite("aleatorio")} className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl">Aleatório</button>
                <button 
  onClick={assinarPremium} 
  className="bg-yellow-500 text-black font-bold text-2xl px-12 py-6 rounded-xl shadow-lg hover:shadow-2xl"
>
  Assinar Premium R$9,90/mês – 7 palpites/dia
</button>
                <button onClick={() => gerarPalpite("premium")} className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-xl">Premium (7)</button>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Último Sorteio</h2>
              <button onClick={carregarHistorico} className="bg-purple-600 text-white px-8 py-3 rounded-lg text-xl">Carregar Histórico</button>
              {historico.length > 0 && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                  <p className="text-xl"><strong>Concurso:</strong> {historico[0].concurso}</p>
                  <p className="text-xl"><strong>Data:</strong> {historico[0].data}</p>
                  <div className="flex justify-center gap-4 flex-wrap mt-4">
                    {historico[0].numeros?.map(n => (
                      <div key={n} className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                        {n.toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Estatísticas</h2>
              <button onClick={carregarEstatisticas} className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-xl">Ver Estatísticas</button>
              {estatisticas && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow text-left">
                  <p><strong>Mais Frequentes:</strong> {estatisticas.mais_frequentes.map(i => i[0]).join(", ")}</p>
                  <p><strong>Menos Frequentes:</strong> {estatisticas.menos_frequentes.map(i => i[0]).join(", ")}</p>
                  <p><strong>Média da Soma:</strong> {estatisticas.media_soma}</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <p className="text-center text-2xl mt-20 text-gray-600">Faça login para começar</p>
        )}

        {loading && <p className="text-center text-xl mt-10">Carregando...</p>}
      </main>

      <footer className="text-center py-8 text-gray-600">
        © 2025 Palpiteiro IA — Todos os direitos reservados
      </footer>
    </div>
  );
}

export default App;
