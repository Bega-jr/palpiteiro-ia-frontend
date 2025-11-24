import React from "react";
import Card from "../components/Card";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Palpiteiro IA</h1>
      <p className="home-subtitle">
        Gere palpites inteligentes baseados em estatísticas reais.
      </p>

      <div className="home-card-grid">
        <Card
          title="Gerador Inteligente"
          description="Monte apostas otimizadas usando IA e estatísticas."
          onClick={() => navigate("/gerador")}
        />

        <Card
          title="Sobre o Projeto"
          description="Entenda como funciona o motor IA por trás da plataforma."
          onClick={() => navigate("/sobre")}
        />

        <Card
          title="Contato"
          description="Precisa de ajuda? Fale com o suporte."
          onClick={() => navigate("/contato")}
        />
      </div>
    </div>
  );
}
