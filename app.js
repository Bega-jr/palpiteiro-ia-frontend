const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinner = document.getElementById("spinner");
const novaBtn = document.getElementById("nova-aposta");

const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-pink-500"];

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return await res.json();
}

async function carregarPalpite() {
  try {
    palpiteEl.innerHTML = "";
    const data = await fetchData(`${API_BASE}/gerar_palpites`);
    const aposta = data.palpites[0] || [];

    aposta.forEach(num => {
      const span = document.createElement("span");
      span.textContent = num.toString().padStart(2, '0');
      span.className = `text-white text-sm font-bold px-3 py-1 rounded-full text-center shadow ${colors[Math.floor(Math.random() * colors.length)]}`;
      palpiteEl.appendChild(span);
    });

    palpiteEl.classList.remove("opacity-0");
  } catch (err) {
    erroEl.textContent = "Erro ao carregar a aposta sugerida.";
    erroEl.classList.remove("hidden");
  }
}

function renderPremiacao(sorteio) {
  const container = document.createElement("div");
  container.className = "bg-gray-50 rounded border border-blue-100 p-3 mt-3";

  const title = document.createElement("h3");
  title.textContent = "🎯 Premiação";
  title.className = "font-semibold text-blue-700 mb-2";
  container.appendChild(title);

  for (let pontos = 15; pontos >= 11; pontos--) {
    const ganhadores = sorteio[`Ganhadores${pontos}`];
    const valor = sorteio[`ValorPremio${pontos}`];
    if (ganhadores != null && valor != null) {
      const linha = document.createElement("p");
      linha.className = "text-sm";
      linha.innerHTML = `• ${pontos} acertos → <strong>${ganhadores}</strong> ganhador${ganhadores !== 1 ? "es" : ""} — R$ ${Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      container.appendChild(linha);
    }
  }

  return container;
}

async function carregarHistorico() {
  try {
    const data = await fetchData(`${API_BASE}/historico`);
    const sorteios = data.sorteios.reverse();
    const s = sorteios[0];

    const numeros = [];
    for (let i = 1; i <= 15; i++) {
      const bola = s[`bola_${i}`];
      if (bola) numeros.push(bola);
    }

    const div = document.createElement("div");
    div.className = "bg-white rounded shadow-md p-4";
    div.innerHTML = `
      <p class="font-semibold text-blue-700">Concurso ${s.Concurso} <span class="text-gray-600">(${s.Data})</span></p>
      <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
      <p class="text-sm"><strong>Ordem Sorteio:</strong> <span class='text-gray-500 italic'>${s.OrdemSorteio || 'não informada'}</span></p>
      <p class="text-sm"><strong>Local:</strong> <span class='text-gray-500 italic'>${s.Local || 'não informado'}</span></p>
    `;

    div.appendChild(renderPremiacao(s));
    historicoEl.appendChild(div);
    historicoEl.classList.remove("opacity-0");
  } catch (err) {
    erroEl.textContent = "Erro ao carregar o histórico.";
    erroEl.classList.remove("hidden");
  }
}

async function iniciar() {
  await Promise.all([carregarPalpite(), carregarHistorico()]);
  spinner.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  novaBtn.addEventListener("click", carregarPalpite);
  iniciar();
});

