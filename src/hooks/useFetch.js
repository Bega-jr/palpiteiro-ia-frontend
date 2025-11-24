import { useState } from "react";
import { api } from "../services/api";

export default function useFetch() {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const request = async (method, url, body = null) => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await api({
        method,
        url,
        data: body,
      });

      return resposta.data;

    } catch (e) {
      console.error("Erro useFetch:", e);
      setErro("Erro ao carregar dados");
      return null;

    } finally {
      setCarregando(false);
    }
  };

  return { request, carregando, erro };
}
