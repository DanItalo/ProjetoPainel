// === SIMULAÇÃO DE DADOS ===
const alertas = [
  { id: 1, descricao: "Acesso não autorizado detectado", data: "2025-10-25", status: "Crítico" },
  { id: 2, descricao: "Erro no módulo financeiro", data: "2025-10-26", status: "Moderado" },
  { id: 3, descricao: "Tempo de resposta alto", data: "2025-10-27", status: "Baixo" },
];

const logs = [
  { tipo: "Erro", mensagem: "Falha na API de autenticação", dia: "Segunda", data: "2025-10-27", hora: "14:35" },
  { tipo: "Aviso", mensagem: "Latência acima da média", dia: "Terça", data: "2025-10-28", hora: "09:20" },
  { tipo: "Info", mensagem: "Backup concluído", dia: "Quarta", data: "2025-10-29", hora: "02:00" },
];

// === RENDERIZAÇÃO ===
const alertasTable = document.getElementById("alertasTable");
const logsTable = document.getElementById("logsTable");

alertas.forEach(a => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${a.id}</td><td>${a.descricao}</td><td>${a.data}</td><td>${a.status}</td>`;
  alertasTable.appendChild(tr);
});

logs.forEach(l => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${l.tipo}</td><td>${l.mensagem}</td><td>${l.dia}</td><td>${l.data}</td><td>${l.hora}</td>`;
  logsTable.appendChild(tr);
});

// === NAVEGAÇÃO ENTRE SEÇÕES ===
const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll("main section");
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
  });
});

// === BOTÃO DE DOWNLOAD ===
document.getElementById("downloadBtn").addEventListener("click", () => {
  const data = { alertas, logs };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio_painelLB.txt";
  link.click();
});

// === GRÁFICO DE LINHA ===
new Chart(document.getElementById("chartCrescimento"), {
  type: "line",
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [{
      label: "Crescimento de Bases",
      data: [10, 14, 18, 25, 30, 45],
      borderColor: "#69103F",
      backgroundColor: "rgba(105, 16, 63, 0.2)",
      fill: true,
      tension: 0.4
    }]
  },
  options: { plugins: { legend: { labels: { color: "#333" } } } }
});

// === GRÁFICO DE PIZZA VIBRANTE ===
new Chart(document.getElementById("chartEstatisticas"), {
  type: "pie",
  data: {
    labels: ["Usuários Ativos", "Casos Concluídos", "Alertas Ativos", "Logs Processados"],
    datasets: [{
      data: [40, 25, 15, 20],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      borderColor: "#fff",
      borderWidth: 2
    }]
  },
  options: {
    plugins: { legend: { labels: { color: "#333" } } }
  }
});

// === FUNÇÃO DE ESCONDER SIDEBAR ===
toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});
