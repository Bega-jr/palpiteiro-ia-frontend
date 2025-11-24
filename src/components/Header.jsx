import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../index";
import { signOut } from "firebase/auth";

import "../styles/header.css";

export default function Header() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="header">
      <h1 className="logo">Palpiteiro IA</h1>

      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/estatisticas">Estatísticas</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/gerar">Gerar Avançado</Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}
