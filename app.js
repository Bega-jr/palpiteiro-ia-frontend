const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinnerEl = document.getElementById("spinner");
const novaBtn = document.getElementById("nova-aposta");
const sorteioInfoEl = document.getElementById("sorteio-info");

const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-pink-500"];

function showSpinner() {
  spinnerEl.classList.remove("hidden");
}

function hideSpinner() {
  spinnerEl.classList.add("hidden");
}

function showError(message) {
  hideSpinner();
  erroEl.textContent = message;
  erroEl.classList.remove("hidden");
}

function fadeIn(element) {
  element.classList.remove("opacity-0");
  element.classList.add("fade-in");
}

async function fetchData(url) {
  showSpinner();
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    if (!data || (url.includes('gerar_palpites') && !data.palpites) || (url.includes('historico') && !data.sorteios)) {
      throw new Error("Dados inválidos");
    }
    return data;
  } catch (err) {
    console.error(`Erro ao carregar ${url}:`, err);
    throw err;
  } finally {
    hideSpinner();
  }
}

async function carregarPalpite() {
  try {
    palpiteEl.innerHTML = "";
    const data = await fetchData(`${API_BASE}/gerar_palpites`);
    const aposta = data.palpites[0] || [];
    aposta.forEach(num => {
      const span = document.createElement("span");
      span.textContent = num.toString().padStart(2, '0');
      span.className = `palpite-span ${colors[Math.floor(Math.random() * colors.length)]}`;
      palpiteEl.appendChild(span);
    });
    fadeIn(palpiteEl);
  } catch (err) {
    showError("Erro ao carregar a aposta sugerida.");
  }
}

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
    const ganhadores = sorteio[ganhadoresKey];
    const valor = sorteio[valorKey];
    if (ganhadores != null && valor != null) {
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
        const ganhadores = sorteio[ganhadoresKey];
        const valor = sorteio[valorKey];
        if (ganhadores != null && valor != null) {
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

async function carregarHistorico() {
  try {
    const data = await fetchData(`${API_BASE}/historico`);
    const sorteios = data.sorteios.reverse();
    const s = sorteios[0];

    const numeros = Array.from({ length: 15 }, (_, i) => s[`bola_${i + 1}`] || '').filter(Boolean);
    const div = document.createElement("div");
    div.className = "bg-white rounded shadow-md p-4";
    div.innerHTML = `
      <p class="font-semibold text-blue-700">Concurso ${s.Concurso} <span class="text-gray-600">(${s.Data})</span></p>
      <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
      <p class="text-sm"><strong>Ordem Sorteio:</strong> <span class='text-gray-500 italic'>${s.OrdemSorteio || 'não informada'}</span></p>
      <p class="text-sm"><strong>Local:</strong> <span class='text-gray-500 italic'>${s.Local || 'não informado'}</span></p>
    `;
    div.appendChild(renderPremiacao(s));
    historicoEl.innerHTML = "";
    historicoEl.appendChild(div);
    sorteioInfoEl.textContent = `Último sorteio: ${s.Data} - ${s.Local || 'Não informado'}`;
    fadeIn(historicoEl);
    fadeIn(sorteioInfoEl);
  } catch (err) {
    showError("Erro ao carregar o histórico.");
  }
}

async function iniciar() {
  try {
    await Promise.all([carregarPalpite(), carregarHistorico()]);
  } catch (err) {
    showError("Erro ao iniciar o aplicativo.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let debounceTimeout;
  novaBtn.addEventListener("click", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(carregarPalpite, 500);
  });
  iniciar();
});
