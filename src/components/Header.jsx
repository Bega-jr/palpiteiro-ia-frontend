// CAMINHO CORRETO DO ARQUIVO:
// src/components/Header.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-bold"
      : "text-gray-700 hover:text-indigo-600";

  return (
    <header className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-700">
          Palpiteiro IA
        </h1>

        <nav className="flex space-x-6 text-lg">
          <Link to="/" className={isActive("/")}>
            Início
          </Link>

          <Link to="/estatisticas" className={isActive("/estatisticas")}>
            Estatísticas
          </Link>

          <Link to="/historico" className={isActive("/historico")}>
            Histórico
          </Link>

          <Link to="/gerar-avancado" className={isActive("/gerar-avancado")}>
            Avançado
          </Link>
        </nav>
      </div>
    </header>
  );
}

