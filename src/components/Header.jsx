import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../index";
import { signOut } from "firebase/auth";

import "../styles/header.css";

export default function Header() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">Palpiteiro IA</h1>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/estatisticas">Estatísticas</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/gerar">Gerador Avançado</Link>
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        Sair
      </button>
    </header>
  );
}
