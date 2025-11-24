import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function GerarApostas() {
  const [quantidade, setQuantidade] = useState(7);
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const gerar = async () => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await api.post("/gerar-apostas", { quantidade });
      setResultado(resposta.data);
    } catch (e) {
      console.error(e);
      setErro("Falha ao gerar apostas.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <div className="content">
        <h2>Gerar Apostas</h2>

        <label>Quantidade de apostas:</label>
        <input
          type="number"
          value={quantidade}
          min={1}
          max={15}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />

        <button onClick={gerar} className="btn-primary">
          Gerar
        </button>

        {carregando && <Loading />}
        {erro && <ErrorMessage mensagem={erro} />}

        {resultado && (
          <pre className="resultado-box">
            {JSON.stringify(resultado, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
