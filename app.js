const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinnerEl = document.getElementById("spinner");

function showSpinner() {
  spinnerEl.classList.remove("hidden");
}

function hideSpinner() {
  spinnerEl.classList.add("hidden");
}

function showError(message) {
  erroEl.textContent = message;
  erroEl.classList.remove("hidden");
}

async function fetchData(endpoint, successCallback, errorMessage) {
  showSpinner();
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (!data || (endpoint === 'historico' && !data.sorteios) || (endpoint === 'gerar_palpites' && !data.palpites)) {
      throw new Error("Dados inválidos");
    }
    successCallback(data);
  } catch (err) {
    console.error(`Erro ao carregar ${endpoint}:`, err);
    showError(errorMessage);
  } finally {
    hideSpinner();
  }
}

function carregarPalpite(data) {
  const aposta = data.palpites[0] || [];
  aposta.forEach(num => {
    const span = document.createElement("span");
    span.textContent = num.toString().padStart(2, '0');
    span.className = "palpite-span";
    palpiteEl.appendChild(span);
  });
}

function carregarHistorico(data) {
  const sorteios = data.sorteios.reverse();
  sorteios.forEach((s) => {
    const div = document.createElement("div");
    const numeros = Array.from({ length: 15 }, (_, i) => s[`bola_${i + 1}`] || '').filter(Boolean);
    div.className = "bg-white rounded shadow-md p-4 mb-4";
    div.innerHTML = `
      <p class="font-semibold text-blue-700">Concurso ${s.Concurso} <span class="text-gray-600">(${s.Data})</span></p>
      <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
      <p class="text-sm"><strong>Ordem Sorteio:</strong> ${s.OrdemSorteio || 'N/A'}</p>
      <p class="text-sm"><strong>Local:</strong> ${s.Local || 'N/A'}</p>
      <p class="text-sm"><strong>Premiação (15 acertos):</strong> R$ ${Number(s.ValorPremio15 || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — ${s.Ganhadores15 || 0} ganhadores</p>
    `;
    historicoEl.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData('gerar_palpites', carregarPalpite, "Erro ao carregar a aposta sugerida.");
  fetchData('historico', carregarHistorico, "Erro ao carregar o histórico.");
});
