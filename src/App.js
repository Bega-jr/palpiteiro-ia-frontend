import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Estatisticas from './pages/Estatisticas';
import Historico from './pages/Historico';
import GerarAvancado from './pages/GerarAvancado';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/gerar-avancado" element={<GerarAvancado />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
