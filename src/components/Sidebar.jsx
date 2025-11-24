import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/">🏠 Início</Link>
      <Link to="/estatisticas">📊 Estatísticas</Link>
      <Link to="/historico">📜 Histórico</Link>
      <Link to="/gerar">🎯 Gerar Apostas</Link>
    </aside>
  );
}
