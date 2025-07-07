const API_BASE = "https://palpiteiro-ia-backend-docker.onrender.com";

async function carregar() {
  const root = document.getElementById("root");
  root.innerHTML = "<h1>Palpiteiro IA</h1>";

  try {
    const palpitesRes = await fetch(`${API_BASE}/gerar_palpites`);
    const palpitesData = await palpitesRes.json();

    root.innerHTML += "<h2>Palpites Sugeridos</h2>";
    palpitesData.palpites.forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "palpite";
      div.innerText = `Aposta ${i + 1}: ${p.join(", ")}`;
      root.appendChild(div);
    });
  } catch {
    root.innerHTML += "<p class='erro'>Erro ao carregar palpites.</p>";
  }

  try {
    const historicoRes = await fetch(`${API_BASE}/historico`);
    const historicoData = await historicoRes.json();

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
  } catch {
    root.innerHTML += "<p class='erro'>Erro ao carregar histórico.</p>";
  }
}
document.addEventListener("DOMContentLoaded", carregar);

carregar();
