const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoDetailsEl = document.getElementById("sorteio-details");
const prizeBoxEl = document.getElementById("prize-box");
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
  const latestSorteio = sorteios[0]; // Pega o último sorteio
  const numeros = Array.from({ length: 15 }, (_, i) => latestSorteio[`bola_${i + 1}`] || '').filter(Boolean);

  historicoDetailsEl.innerHTML = `
    <div class="bg-white rounded shadow-md p-4">
      <p class="font-semibold text-blue-700">Concurso ${latestSorteio.Concurso} <span class="text-gray-600">(${latestSorteio.Data})</span></p>
      <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
      <p class="text-sm"><strong>Ordem Sorteio:</strong> ${latestSorteio.OrdemSorteio || 'N/A'}</p>
      <p class="text-sm"><strong>Local:</strong> ${latestSorteio.Local || 'N/A'}</p>
    </div>
  `;

  prizeBoxEl.innerHTML = `
    <div class="prize-box">
      <h3 class="text-md font-semibold text-blue-700 mb-2">Premiações</h3>
      <p class="text-sm"><strong>15 acertos:</strong> R$ ${Number(latestSorteio.ValorPremio15 || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — <span class="font-bold">${latestSorteio.Ganhadores15 || 0}</span> ganhadores</p>
      <p class="text-sm"><strong>14 acertos:</strong> R$ ${(data.sorteios[0].listaRateioPremio?.find(f => f.faixa === 2)?.valorPremio || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — <span class="font-bold">${data.sorteios[0].listaRateioPremio?.find(f => f.faixa === 2)?.numeroDeGanhadores || 0}</span> ganhadores</p>
      <p class="text-sm"><strong>13 acertos:</strong> R$ ${(data.sorteios[0].listaRateioPremio?.find(f => f.faixa === 3)?.valorPremio || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — <span class="font-bold">${data.sorteios[0].listaRateioPremio?.find(f => f.faixa === 3)?.numeroDeGanhadores || 0}</span> ganhadores</p>
    </div>
  `;
  prizeBoxEl.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData('gerar_palpites', carregarPalpite, "Erro ao carregar a aposta sugerida.");
  fetchData('historico', carregarHistorico, "Erro ao carregar o histórico.");
});
