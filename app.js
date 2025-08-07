document.getElementById("estatisticas-btn").addEventListener("click", () => {
  fetch("https://palpiteiro-ia-backend.onrender.com/estatisticas")
    .then(res => res.json())
    .then(data => {
      const info = `
        <h3>Estatísticas:</h3>
        <p><strong>Mais Frequentes:</strong> ${data.mais_frequentes.map(n => n[0]).join(", ")}</p>
        <p><strong>Menos Frequentes:</strong> ${data.menos_frequentes.map(n => n[0]).join(", ")}</p>
        <p><strong>Média de Soma:</strong> ${data.media_soma}</p>
      `;
      document.getElementById("historico-container").innerHTML = info;
    }).catch(() => {
      document.getElementById("historico-container").innerHTML = "<p>Erro ao buscar estatísticas.</p>";
    });
});