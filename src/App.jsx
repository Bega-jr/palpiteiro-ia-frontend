import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Estatisticas from "./pages/Estatisticas";
import Apostas from "./pages/Apostas";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estatisticas" element={<Estatisticas />} />
            <Route path="/apostas" element={<Apostas />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
