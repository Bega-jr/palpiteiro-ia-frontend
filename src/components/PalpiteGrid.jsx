// ARQUIVO: components/PalpiteGrid.jsx (CÓDIGO FINAL)

export default function PalpiteGrid({ numbers = [] }) {
  // Cria o array de 1 a 25 para renderizar o volante completo
  const full = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    // 🚨 CORREÇÃO/MELHORIA: Adicionado role="grid" para acessibilidade
    <div className="grid grid-cols-5 gap-2" role="grid" aria-label="Volante de 25 números da Lotofácil">
      {full.map((n) => {
        // Verifica se o número (n) está no array de números sugeridos (numbers)
        const active = numbers.includes(n);

        return (
          <div
            key={n}
            role="cell" // Define o item como uma célula do grid
            aria-pressed={active} // 🚨 MELHORIA: Indica o estado de seleção
            aria-label={`Número ${n}. ${active ? 'Selecionado' : 'Não selecionado'}`}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold 
              palpite-numero // Classe base para consistência
              ${active 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {/* 🚨 CORREÇÃO/MELHORIA: Garante o formato 01, 02, ..., 25 */}
            {String(n).padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}
