import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/estatisticas">📈 Estatísticas</Link></li>
        <li><Link to="/historico">📜 Histórico</Link></li>
        <li><Link to="/gerar">🎯 Gerar Apostas</Link></li>
      </ul>
    </aside>
  );
}
