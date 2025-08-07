import React from "react";
import Palpite from "./components/Palpite";
import Historico from "./components/Historico";
import Estatisticas from "./components/Estatisticas";
import Login from "./components/Login";

function App() {
  return (
    <div id="root">
      <header>
        <h1>Palpiteiro IA</h1>
        <Login />
      </header>
      <main>
        <Palpite />
        <Historico />
        <Estatisticas />
      </main>
      <footer>
        <p>© 2025 Palpiteiro IA — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;