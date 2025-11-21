// ARQUIVO: components/NumeroBolinha.jsx

import React from "react";

/**
 * Componente simples para renderizar um número em formato de bolinha.
 * Usado em Historico e Estatisticas.
 * * @param {number} numero - O número a ser exibido.
 * @param {string} className - Classes adicionais do Tailwind.
 * @param {boolean} dark - Se deve usar a cor primária (azul) ou cinza claro.
 */
export default function NumeroBolinha({ numero, className = "", dark = true }) {
  // Define o estilo baseado na prop 'dark'
  const baseClasses = `
    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg 
    shadow-sm transition duration-150 flex-shrink-0
  `;
  
  const colorClasses = dark 
    ? "bg-blue-600 text-white" 
    : "bg-gray-200 text-gray-700";

  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`} aria-label={`Número ${numero}`}>
      {/* Garante o formato 01, 02, etc. */}
      {String(numero).padStart(2, "0")}
    </div>
  );
}
