const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinnerEl = document.getElementById("spinner");
const estatisticasBtn = document.getElementById("estatisticas-btn");
const sorteioInfoEl = document.getElementById("sorteio-info");
const proximoSorteioEl = document.getElementById("proximo-sorteio");
const loginBtn = document.getElementById("login-btn");
const loginOptions = document.getElementById("login-options");
const apostasLogadoEl = document.getElementById("apostas-logado");
const apostasBodyEl = document.getElementById("apostas-body");

// Números consistentes baseados no histórico
const FIXED_NUMBERS = [1, 3, 4, 15, 21, 23];

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
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    let aposta = JSON.parse(localStorage.getItem("weeklyAposta")) || null;

    if (!aposta || dayOfWeek === 0) { // Atualiza só aos domingos ou se não houver aposta
      const data = await fetchData(`${API_BASE}/gerar_palpites?fixed=true`);
      aposta = data.palpites[0] || [];
      localStorage.setItem("weeklyAposta", JSON.stringify(aposta));
    }

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
    // Fallback manual se a API falhar
    const fallbackAposta = [1, 3, 4, 7, 9, 12, 15, 17, 19, 21, 23, 24, 25];
    localStorage.setItem("weeklyAposta", JSON.stringify(fallbackAposta));
    fallbackAposta.forEach(num => {
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
  }
}

function renderHistorico(sorteio) {
  const container = document.createElement("div");
  container.className = "historico-container";

  // Resumo do último concurso
  const resumo = document.createElement("div");
  resumo.className = "historico-resumo";
  resumo.innerHTML = `
    <div class="historico-resumo-item">
      <span>🏆 Concurso</span><br><strong>${sorteio.Concurso}</strong>
    </div>
    <div class="historico-resumo-item">
      <span>📅 Data</span><br><strong>${sorteio.Data}</strong>
    </div>
    <div class="historico-resumo-item">
      <span>📍 Local</span><br><strong>${sorteio.Local || 'Não informado'}</strong>
    </div>
    <div class="historico-resumo-item">
      <span>💰 Valor Pago</span><br><strong>R$ ${sorteio.ValorPremio15 + sorteio.ValorPremio14 + sorteio.ValorPremio13 + sorteio.ValorPremio12 + sorteio.ValorPremio11 || 'Não informado'}</strong>
    </div>
    <div class="historico-resumo-item">
      <span>👥 Ganhadores</span><br><strong>${(sorteio.Ganhadores15 || 0) + (sorteio.Ganhadores14 || 0) + (sorteio.Ganhadores13 || 0) + (sorteio.Ganhadores12 || 0) + (sorteio.Ganhadores11 || 0)}</strong>
    </div>
  `;
  container.appendChild(resumo);

  // Números e premiação
  const numeros = Array.from({ length: 15 }, (_, i) => sorteio[`bola_${i + 1}`] || '').filter(Boolean);
  const div = document.createElement("div");
  div.className = "palpite";
  div.innerHTML = `
    <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
    <p class="text-sm"><strong>Ordem Sorteio:</strong> <span class='text-gray-600 italic'>${sorteio.OrdemSorteio || 'não informada'}</span></p>
  `;
  container.appendChild(div);

  // Tabela de premiação
  const premTable = document.createElement("table");
  premTable.className = "premiacao-table";
  for (let pontos = 15; pontos >= 11; pontos--) {
    const ganhadoresKey = `Ganhadores${pontos}`;
    const valorKey = `ValorPremio${pontos}`;
    const ganhadores = sorteio[ganhadoresKey] || 0;
    const valor = sorteio[valorKey] || 0;
    if (ganhadores !== null || valor !== null) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${pontos} acertos</td><td><strong>${ganhadores}</strong></td><td>R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>`;
      premTable.appendChild(row);
    }
  }
  container.appendChild(premTable);

  return container;
}

async function carregarHistorico() {
  try {
    const data = await fetchData(`${API_BASE}/historico`);
    const sorteios = data.sorteios.reverse();
    const s = sorteios[0];
    const proximo = data.sorteios[1] || {}; // Simula próximo sorteio (a ser ajustado com API)

    historicoEl.innerHTML = "";
    historicoEl.appendChild(renderHistorico(s));
    sorteioInfoEl.textContent = `Último sorteio: ${s.Data} - ${s.Local || 'Não informado'}`;
    proximoSorteioEl.textContent = `Próximo sorteio: ${proximo.data || 'Data não informada'} - ${proximo.local || 'Local não informado'} - Est. R$ ${proximo.valorEstimadoProximoConcurso || '0,00'}`;
    fadeIn(historicoEl);
    fadeIn(sorteioInfoEl);
    fadeIn(proximoSorteioEl);
  } catch (err) {
    showError("Erro ao carregar o histórico. Usando dados de exemplo.");
    const s = {
      Concurso: "3436", Data: "07/07/2025", Local: "SÃO PAULO, SP",
      bola_1: "01", bola_2: "02", bola_3: "03", bola_4: "04", bola_5: "05",
      bola_6: "06", bola_7: "07", bola_8: "08", bola_9: "09", bola_10: "10",
      bola_11: "11", bola_12: "12", bola_13: "13", bola_14: "14", bola_15: "15",
      OrdemSorteio: "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15",
      Ganhadores15: 1, ValorPremio15: 1806333.97,
      Ganhadores14: 248, ValorPremio14: 2181.72,
      Ganhadores13: 9800, ValorPremio13: 30.0,
      Ganhadores12: 111936, ValorPremio12: 12.0,
      Ganhadores11: 627357, ValorPremio11: 6.0
    };
    const proximo = { data: "12/07/2025", local: "RIO DE JANEIRO, RJ", valorEstimadoProximoConcurso: "2.000.000,00" };
    historicoEl.innerHTML = "";
    historicoEl.appendChild(renderHistorico(s));
    sorteioInfoEl.textContent = `Último sorteio: ${s.Data} - ${s.Local || 'Não informado'}`;
    proximoSorteioEl.textContent = `Próximo sorteio: ${proximo.data || 'Data não informada'} - ${proximo.local || 'Local não informado'} - Est. R$ ${proximo.valorEstimadoProximoConcurso || '0,00'}`;
    fadeIn(historicoEl);
    fadeIn(sorteioInfoEl);
    fadeIn(proximoSorteioEl);
  }
}

function adicionarApostaLogado(concurso, numeros, acertos = "Concurso ainda não apurado") {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${concurso}</td>
    <td>${numeros.join(", ")}</td>
    <td>${acertos}</td>
  `;
  apostasBodyEl.appendChild(row);
}

async function iniciar() {
  try {
    await Promise.all([carregarPalpite(), carregarHistorico()]);
    // Simula apostas logadas (a ser integrado com backend)
    if (false) { // Substituir por lógica de autenticação
      apostasLogadoEl.style.display = "block";
      adicionarApostaLogado("3437", [1, 3, 4, 7, 9, 12, 15, 17, 19, 21, 23, 24, 25]);
      adicionarApostaLogado("3436", [2, 5, 8, 10, 13, 16, 18, 20, 22, 1, 3, 4, 15], "5 acertos");
    }
  } catch (err) {
    showError("Erro ao iniciar o aplicativo.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  estatisticasBtn.addEventListener("click", () => {
    alert("Funcionalidade de estatísticas em desenvolvimento!");
  });
  loginBtn.addEventListener("click", () => {
    loginOptions.style.display = loginOptions.style.display === "none" ? "block" : "none";
  });
  document.getElementById("login-google").addEventListener("click", () => {
    loginOptions.style.display = "none";
    alert("Login com Google em desenvolvimento!");
  });
  document.getElementById("login-email").addEventListener("click", () => {
    loginOptions.style.display = "none";
    alert("Login com E-mail em desenvolvimento!");
  });
  iniciar();
});
