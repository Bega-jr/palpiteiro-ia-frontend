import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Estatisticas() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarEstatisticas = async () => {
    try {
      const resposta = await api.get("/estatisticas");
      setDados(resposta.data);
    } catch (e) {
      setErro("Erro ao carregar estatísticas.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="content">

        <h2>Estatísticas da Lotofácil</h2>

        {carregando && <Loading />}
        {erro && <ErrorMessage mensagem={erro} />}

        {dados && (
          <pre className="estatisticas-box">
            {JSON.stringify(dados, null, 2)}
          </pre>
        )}

      </div>
    </div>
  );
}

