import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../index";

export default function MainLayout() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* HEADER SUPERIOR */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold">Palpiteiro IA</h1>

        <nav className="flex gap-6 text-lg">
          <Link className="hover:text-yellow-300" to="/">Home</Link>
          <Link className="hover:text-yellow-300" to="/estatisticas">Estatísticas</Link>
          <Link className="hover:text-yellow-300" to="/historico">Histórico</Link>
          <Link className="hover:text-yellow-300" to="/gerar">Gerar Avançado</Link>
        </nav>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded font-semibold hover:bg-red-600"
        >
          Sair
        </button>
      </header>

      {/* CONTEÚDO DAS ROTAS */}
      <main className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </main>

      <footer className="text-center py-6 text-gray-500">
        © 2025 Palpiteiro IA — Todos os direitos reservados.
      </footer>
    </div>
  );
}

