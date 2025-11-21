// ARQUIVO: layouts/MainLayout.jsx

import React from "react";
// Importamos NavLink no lugar de Link para estilizar o link ativo
import { Outlet, NavLink, useNavigate } from "react-router-dom"; 
import { signOut } from "firebase/auth";
import { auth } from "../index";

export default function MainLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      // O App.js detecta a mudança e navega para /login, mas chamamos para garantir
      navigate("/login"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Força a navegação mesmo em erro de rede, já que o usuário tentou sair.
      navigate("/login"); 
    }
  };

  // Define as classes para os links de navegação. 
  // Usa "text-yellow-300 font-bold" se o link estiver ativo (isActive).
  const getNavLinkClasses = ({ isActive }) => 
    "hover:text-yellow-300 transition duration-150" + 
    (isActive ? " text-yellow-300 font-bold border-b-2 border-yellow-300" : "");


  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* HEADER SUPERIOR */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        
        {/* 🚨 CORREÇÃO: Removido o <h1> para evitar duplicidade. 
            O <h1> será agora na página Home.jsx. */}
        <div className="text-2xl font-bold">Palpiteiro IA</div>

        {/* 🚨 CORREÇÃO: Uso de NavLink e rótulo ARIA para acessibilidade. */}
        <nav className="flex gap-6 text-lg" aria-label="Navegação Principal">
          <NavLink className={getNavLinkClasses} to="/">Home</NavLink>
          <NavLink className={getNavLinkClasses} to="/estatisticas">Estatísticas</NavLink>
          <NavLink className={getNavLinkClasses} to="/historico">Histórico</NavLink>
          <NavLink className={getNavLinkClasses} to="/gerar">Gerar Avançado</NavLink>
        </nav>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded font-semibold hover:bg-red-600 transition"
          aria-label="Sair da Conta"
        >
          Sair
        </button>
      </header>

      {/* CONTEÚDO DAS ROTAS */}
      <main className="p-6 max-w-5xl mx-auto">
        <Outlet /> {/* RENDERIZA OS COMPONENTES FILHOS (Home, Estatisticas, etc.) */}
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 Palpiteiro IA — Todos os direitos reservados.
      </footer>
    </div>
  );
}
