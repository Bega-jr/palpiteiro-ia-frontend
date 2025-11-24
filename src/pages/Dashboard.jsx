import React from "react";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="page-container">
      <Header />

      <div className="content">
        <h2>Bem-vindo ao Palpiteiro IA</h2>
        <p>Escolha uma ação no menu para começar.</p>
      </div>
    </div>
  );
}
