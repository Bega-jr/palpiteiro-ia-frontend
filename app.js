const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";

async function carregar() {
  const root = document.getElementById("root");
  root.innerHTML = "<h1>Palpiteiro IA</h1>";

  try {
    const palpitesRes = await fetch(`${API_BASE}/gerar_palpites`);
    if (!palpitesRes.ok) throw new Error(`HTTP error! status: ${palpitesRes.status}`);
    const palpitesData = await palpitesRes.json();
    if (!palpitesData.palpites || !Array.isArray(palpitesData.palpites)) {
      throw new Error("Dados de palpites inválidos");
    }
    root.innerHTML += "<h2>Palpites Sugeridos</h2>";
    palpitesData.palpites.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "palpite";
      div.innerText = `Aposta ${i + 1}: ${p.join(", ")}`;
      root.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao carregar palpites:", e);
    root.innerHTML += "<p class='erro'>Erro ao carregar palpites. Tente novamente.</p>";
  }

  try {
    const historicoRes = await fetch(`${API_BASE}/historico`);
    if (!historicoRes.ok) throw new Error(`HTTP error! status: ${historicoRes.status}`);
    const historicoData = await historicoRes.json();
    if (!historicoData.sorteios || !Array.isArray(historicoData.sorteios)) {
      throw new Error("Dados de histórico inválidos");
    }
    root.innerHTML += "<h2>Últimos Sorteios</h2>";
    historicoData.sorteios.reverse().forEach((s) => {
      const numeros = [];
      for (let j = 1; j <= 15; j++) {
        const bola = s[`bola_${j}`];
        if (bola) numeros.push(bola);
      }
      const div = document.createElement("div");
      div.className = "palpite";
      div.innerHTML = `<strong>Concurso ${s.Concurso} (${s.Data})</strong><br>${numeros.join(", ")}`;
      root.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao carregar histórico:", e);
    root.innerHTML += "<p class='erro'>Erro ao carregar histórico. Tente novamente.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregar);
