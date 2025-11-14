import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Apostas from './pages/Apostas';
import Premium from './pages/Premium';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-blue-600 text-white p-4 text-center shadow-md">
          <h1 className="text-2xl font-bold">Palpiteiro IA</h1>
          <Login />
        </header>
        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apostas" element={<Apostas />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </main>
        <footer className="text-center py-4 text-sm text-gray-500">
          © 2025 Palpiteiro IA
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
