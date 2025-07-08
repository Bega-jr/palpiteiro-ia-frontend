const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinnerEl = document.getElementById("spinner");
const novaBtn = document.getElementById("nova-aposta");
const estatisticasBtn = document.getElementById("estatisticas-btn");
const sorteioInfoEl = document.getElementById("sorteio-info");

function showSpinner() {
  spinnerEl.style.display = "block";
}

function hideSpinner() {
  spinnerEl.style.display = "none";
}

function showError(message) {
  hideSpinner();
  erroEl.textContent = message;
  erroEl.style.display = "block";
}

function fadeIn(element) {
  element.style.opacity = "1";
  element.style.transform = "translateY(0)";
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
      span.className = "palpite-span";
      span.style.display = "inline-block";
      span.style.width = "40px";
      span.style.height = "40px";
      span.style.lineHeight = "40px";
      span.style.textAlign = "center";
      palpiteEl.appendChild(span);
    });
    fadeIn(palpiteEl);
  } catch (err) {
    showError("Erro ao carregar a aposta sugerida.");
  }
}

function renderPremiacao(sorteio) {
  const container = document.createElement("div");
  container.className = "palpite";
  const title = document.createElement("h3");
  title.textContent = "🎯 Premiação";
  title.className = "text-blue-700 font-semibold mb-2";
  container.appendChild(title);

  const table = document.createElement("table");
  table.className = "premiacao-table";
  const visibleFaixas = 3;
  let faixasExibidas = 0;
  for (let pontos = 15; pontos >= 11 && faixasExibidas < visibleFaixas; pontos--) {
    const ganhadoresKey = `Ganhadores${pontos}`;
    const valorKey = `ValorPremio${pontos}`;
    const ganhadores = sorteio[ganhadoresKey] || 0;
    const valor = sorteio[valorKey] || 0;
    if (ganhadores !== null || valor !== null) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${pontos} acertos</td><td><strong>${ganhadores}</strong> ganhador${ganhadores !== 1 ? "es" : ""}</td><td>R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>`;
      table.appendChild(row);
      faixasExibidas++;
    }
  }
  container.appendChild(table);

  if (faixasExibidas < 5) {
    const verMais = document.createElement("button");
    verMais.textContent = "Ver Mais";
    verMais.className = "text-blue-500 hover:text-blue-700 mt-2";
    verMais.addEventListener("click", () => {
      container.innerHTML = "";
      container.appendChild(title);
      const fullTable = document.createElement("table");
      fullTable.className = "premiacao-table";
      for (let pontos = 15; pontos >= 11; pontos--) {
        const ganhadoresKey = `Ganhadores${pontos}`;
        const valorKey = `ValorPremio${pontos}`;
        const ganhadores = sorteio[ganhadoresKey] || 0;
        const valor = sorteio[valorKey] || 0;
        if (ganhadores !== null || valor !== null) {
          const row = document.createElement("tr");
          row.innerHTML = `<td>${pontos} acertos</td><td><strong>${ganhadores}</strong> ganhador${ganhadores !== 1 ? "es" : ""}</td><td>R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>`;
          fullTable.appendChild(row);
        }
      }
      container.appendChild(fullTable);
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
    div.className = "palpite";
    div.innerHTML = `
      <p class="font-semibold text-blue-700">Concurso ${s.Concurso} <span class="text-gray-600">(${s.Data})</span></p>
      <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
      <p class="text-sm"><strong>Ordem Sorteio:</strong> <span class='text-gray-600 italic'>${s.OrdemSorteio || 'não informada'}</span></p>
      <p class="text-sm"><strong>Local:</strong> <span class='text-gray-600 italic'>${s.Local || 'não informado'}</span></p>
    `;
    div.appendChild(renderPremiacao(s));
    const extraInfo = document.createElement("div");
    extraInfo.className = "extra-info";
    extraInfo.innerHTML = `
      <p><strong>Arrecadação:</strong> R$ ${sorteio.valorArrecadado || 'Não informado'}</p>
      <p><strong>Próximo Concurso:</strong> ${sorteio.dataProximoConcurso || 'Não informado'} - Est. R$ ${sorteio.valorEstimadoProximoConcurso || '0,00'}</p>
    `;
    div.appendChild(extraInfo);
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
  estatisticasBtn.addEventListener("click", () => {
    alert("Funcionalidade de estatísticas em desenvolvimento!");
  });
  iniciar();
});
