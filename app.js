function renderPremiacao(sorteio) {
  const container = document.createElement("div");
  container.className = "bg-gray-50 rounded border border-blue-100 p-3 mt-3";
  const title = document.createElement("h3");
  title.textContent = "🎯 Premiação";
  title.className = "font-semibold text-blue-700 mb-2";
  container.appendChild(title);

  const visibleFaixas = 3; // Mostra apenas 3 faixas inicialmente
  let faixasExibidas = 0;
  for (let pontos = 15; pontos >= 11 && faixasExibidas < visibleFaixas; pontos--) {
    const ganhadoresKey = `Ganhadores${pontos}`;
    const valorKey = `ValorPremio${pontos}`;
    const ganhadores = sorteio[ganhadoresKey] || 0;
    const valor = sorteio[valorKey] || 0;
    if (ganhadores !== null || valor !== null) { // Verifica se existe algum dado
      console.log(`Faixa ${pontos}: Ganhadores=${ganhadores}, Valor=${valor}`); // Log pra depuração
      const linha = document.createElement("p");
      linha.className = "text-sm";
      linha.innerHTML = `• ${pontos} acertos → <strong>${ganhadores}</strong> ganhador${ganhadores !== 1 ? "es" : ""} — R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      container.appendChild(linha);
      faixasExibidas++;
    }
  }
  if (faixasExibidas < 5) { // Se houver mais faixas
    const verMais = document.createElement("button");
    verMais.textContent = "Ver Mais";
    verMais.className = "text-blue-500 hover:text-blue-700 mt-2";
    verMais.addEventListener("click", () => {
      container.innerHTML = ""; // Recria com todas as faixas
      container.appendChild(title);
      for (let pontos = 15; pontos >= 11; pontos--) {
        const ganhadoresKey = `Ganhadores${pontos}`;
        const valorKey = `ValorPremio${pontos}`;
        const ganhadores = sorteio[ganhadoresKey] || 0;
        const valor = sorteio[valorKey] || 0;
        if (ganhadores !== null || valor !== null) {
          const linha = document.createElement("p");
          linha.className = "text-sm";
          linha.innerHTML = `• ${pontos} acertos → <strong>${ganhadores}</strong> ganhador${ganhadores !== 1 ? "es" : ""} — R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
          container.appendChild(linha);
        }
      }
    });
    container.appendChild(verMais);
  }
  return container;
}
