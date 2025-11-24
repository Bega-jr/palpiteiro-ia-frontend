// ARQUIVO: src/utils/format.js

// Formata números da Lotofácil sempre com 2 dígitos
export function formatNumero(num) {
  return num.toString().padStart(2, "0");
}

// Formata data (ex: "2025-11-23T10:00:00Z")
export function formatarData(dataIso) {
  const data = new Date(dataIso);

  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Formata listas de números [1,2,3] → "01 02 03"
export function formatarListaNumeros(lista) {
  return lista.map((n) => formatNumero(n)).join(" ");
}
