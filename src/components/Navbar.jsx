import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Palpiteiro IA
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">
            Início
          </Link>

          <Link to="/gerar" className="hover:text-yellow-300 transition">
            Gerar Apostas
          </Link>

          <Link to="/avancado" className="hover:text-yellow-300 transition">
            Avançado
          </Link>
        </div>
      </div>
    </nav>
  );
}
