// ARQUIVO: pages/Historico.jsx (Trecho da Correção)

// Importa a instância 'api' configurada (que usa o token de autenticação)
import { api } from "../services/api"; 
import NumeroBolinha from "../components/NumeroBolinha";

// Função não precisa mais receber API_URL como prop
function Historico() { 
  // ... estados 'historico' e 'loading'

  const carregarHistorico = async () => {
    try {
      setLoading(true);
      // 🚨 CORREÇÃO: Usando a instância 'api' do Axios
      const response = await api.get("/historico"); 
      
      // Axios retorna os dados em response.data
      const data = response.data; 
      
      // 🚨 CORREÇÃO: Tratamento de erro robusto no .catch
      setHistorico(data.sorteios || []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      // Adicione um estado de erro para feedback ao usuário
      // setErro("Não foi possível carregar o histórico. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  // ...
}
