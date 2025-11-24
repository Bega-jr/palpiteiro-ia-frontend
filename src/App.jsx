// ARQUIVO: src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuthContext } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Estatisticas from "./pages/Estatisticas";
import Historico from "./pages/Historico";
import GerarAvancado from "./pages/GerarAvancado";
import Login from "./components/Login";

// Componente que protege rotas automaticamente
function RotaProtegida({ children }) {
  const { user, carregando } = useAuthContext();

  if (carregando) {
    return <div className="p-10 text-center text-lg">Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ROTA DE LOGIN */}
          <Route
            path="/login"
            element={
              <RotaProtegida invertida>
                <Login />
              </RotaProtegida>
            }
          />

          {/* ROTAS PROTEGIDAS */}
          <Route
            path="/"
            element={
              <RotaProtegida>
                <MainLayout />
              </RotaProtegida>
            }
          >
            <Route index element={<Home />} />
            <Route path="estatisticas" element={<Estatisticas />} />
            <Route path="historico" element={<Historico />} />
            <Route path="gerar" element={<GerarAvancado />} />
          </Route>

          {/* ROTAS DESCONHECIDAS */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
