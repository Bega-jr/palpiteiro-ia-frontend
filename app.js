const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";

const erroEl = document.getElementById("erro");
const palpiteEl = document.getElementById("palpite-container");
const historicoEl = document.getElementById("historico-container");

async function carregarPalpite() {
  try {
    const res = await fetch(`${API_BASE}/gerar_palpites`);
    const data = await res.json();
    const aposta = data.palpites[0] || [];

    aposta.forEach(num => {
      const span = document.createElement("span");
      span.textContent = num.toString().padStart(2, '0');
      span.className = "bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full text-center";
      palpiteEl.appendChild(span);
    });
  } catch (err) {
    erroEl.textContent = "Erro ao carregar a aposta sugerida.";
  }
}

async function carregarHistorico() {
  try {
    const res = await fetch(`${API_BASE}/historico`);
    const data = await res.json();
    const sorteios = data.sorteios.reverse();

    sorteios.forEach((s) => {
      const div = document.createElement("div");
      const numeros = [];
      for (let i = 1; i <= 15; i++) {
        const bola = s[`bola_${i}`];
        if (bola) numeros.push(bola);
      }
      div.className = "bg-white rounded shadow-md p-4";
      div.innerHTML = `
        <p class="font-semibold text-blue-700">Concurso ${s.Concurso} <span class="text-gray-600">(${s.Data})</span></p>
        <p class="text-sm mt-2"><strong>Números:</strong> ${numeros.join(", ")}</p>
        <p class="text-sm"><strong>Ordem Sorteio:</strong> ${s.OrdemSorteio || 'N/A'}</p>
        <p class="text-sm"><strong>Local:</strong> ${s.Local || 'N/A'}</p>
        <p class="text-sm"><strong>Premiação (15 acertos):</strong> R$ ${Number(s.ValorPremio15 || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — ${s.Ganhadores15 || 0} ganhadores</p>
      `;
      historicoEl.appendChild(div);
    });
  } catch (err) {
    erroEl.textContent = "Erro ao carregar o histórico.";
  }
}

carregarPalpite();
carregarHistorico();
