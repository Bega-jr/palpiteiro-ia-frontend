import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidemenu.css";

export default function SideMenu() {
  const { pathname } = useLocation();

  return (
    <aside className="side-menu">
      <h3>Menu</h3>

      <ul>
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/">🏠 Home</Link>
        </li>

        <li className={pathname === "/estatisticas" ? "active" : ""}>
          <Link to="/estatisticas">📊 Estatísticas</Link>
        </li>

        <li className={pathname === "/historico" ? "active" : ""}>
          <Link to="/historico">📜 Últimos Resultados</Link>
        </li>

        <li className={pathname === "/gerar" ? "active" : ""}>
          <Link to="/gerar">🎯 Gerador Avançado</Link>
        </li>
      </ul>
    </aside>
  );
}
