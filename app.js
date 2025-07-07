const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";
const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");
const spinner = document.getElementById("spinner");

const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500", "bg-pink-500"];

async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return await res.json();
}

async function carregarPalpite() {
  try {
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

async function carregarHistorico() {
  try {
    const data = await fetchData(`${API_BASE}/historico`);
    const sorteios = data.sorteios.reverse();
    const s = sorteios[0]; // Pegar o último

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
      <p class="text-sm"><strong>Premiação (15 acertos):</strong> R$ ${Number(s.ValorPremio15 || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — ${s.Ganhadores15 || 0} ganhadores</p>
    `;
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

iniciar();
