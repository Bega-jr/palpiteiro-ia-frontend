import { Link } from 'react-router-dom';

export default function MainLayout({ children }) {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src="/logo192.png" alt="logo" className="w-10 h-10 rounded" />
            <div>
              <h1 className="text-lg font-bold">Palpiteiro IA</h1>
              <div className="text-xs text-gray-500">Lotofácil — geração inteligente</div>
            </div>
          </div>
          <nav className="flex gap-3">
            <Link to="/" className="text-sm text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/estatisticas" className="text-sm text-gray-700 hover:text-blue-600">Estatísticas</Link>
            <Link to="/historico" className="text-sm text-gray-700 hover:text-blue-600">Histórico</Link>
            <Link to="/gerar-avancado" className="text-sm text-gray-700 hover:text-blue-600">Avançado</Link>
          </nav>
        </div>
      </header>

      <main className="py-8">
        {children}
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container text-sm text-gray-500">
          Desenvolvido por você · Dados e estatísticas — teste e ajuste
        </div>
      </footer>
    </div>
  );
}
