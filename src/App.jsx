import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./index";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Estatisticas from "./pages/Estatisticas";
import Historico from "./pages/Historico";
import GerarAvancado from "./pages/GerarAvancado";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setCarregando(false);
    });

    return () => unsub();
  }, []);

  if (carregando) {
    return (
      <div className="p-10 text-center text-lg">
        Carregando...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ROTA DE LOGIN */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* ROTAS PROTEGIDAS */}
        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="estatisticas" element={<Estatisticas />} />
          <Route path="historico" element={<Historico />} />
          <Route path="gerar" element={<GerarAvancado />} />
        </Route>

        {/* QUALQUER OUTRA ROTA */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
