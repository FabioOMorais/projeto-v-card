const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Arquivo onde os acessos ficam salvos
const LOG_FILE = path.join(__dirname, "logs.json");

// Mapeamento do ID do cartão para o site real
const cardLinks = {
  vcard: "https://projeto-cartao-fb.vercel.app/"
};

// Detecta tipo de dispositivo
function getDeviceType(userAgent = "") {
  const ua = userAgent.toLowerCase();

  if (ua.includes("android")) return "android";
  if (ua.includes("iphone") || ua.includes("ipad")) return "ios";
  if (
    ua.includes("windows") ||
    ua.includes("macintosh") ||
    ua.includes("linux")
  ) {
    return "desktop";
  }
  return "outro";
}

// Detecta navegador
function getBrowser(userAgent = "") {
  const ua = userAgent.toLowerCase();

  if (ua.includes("chrome") && !ua.includes("edge")) return "chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("edge")) return "edge";
  return "outro";
}

// Salva o log no arquivo
function saveLog(entry) {
  let logs = [];

  if (fs.existsSync(LOG_FILE)) {
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    if (content.trim()) {
      logs = JSON.parse(content);
    }
  }

  logs.push(entry);

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

// ===============================
// ROTA DO QR CODE (REDIRECIONA + REGISTRA)
// ===============================
app.get("/r/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  const finalUrl = cardLinks[cardId];

  if (!finalUrl) {
    return res.status(404).send("Cartão não encontrado.");
  }

  const userAgent = req.headers["user-agent"] || "";

  const logEntry = {
    timestamp: new Date().toISOString(),
    cardId,
    deviceType: getDeviceType(userAgent),
    browser: getBrowser(userAgent)
  };

  saveLog(logEntry);

  return res.redirect(finalUrl);
});

// ===============================
// ROTA DE TESTE
// ===============================
app.get("/", (req, res) => {
  res.send("Servidor do cartão de visita rodando.");
});

// ===============================
// ROTA DE ESTATÍSTICAS (BLOQUEADA EM PRODUÇÃO)
// ===============================
app.get("/api/stats", (req, res) => {
  // 🔒 Bloqueia acesso quando estiver publicado (Render)
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({ erro: "Acesso não permitido em produção" });
  }

  if (!fs.existsSync(LOG_FILE)) {
    return res.json({
      total: 0,
      today: 0,
      lastAccess: null,
      averagePerDay: 0,
      peakHourToday: null,
      byDevice: {},
      byBrowser: {},
      byDay: {}
    });
  }

  const logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf-8"));

  const total = logs.length;

  // ---- ACESSOS DE HOJE ----
  const now = new Date();
  const todayLogs = logs.filter(log => {
    const d = new Date(log.timestamp);
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  });

  const today = todayLogs.length;

  // ---- ÚLTIMO ACESSO ----
  const lastAccess = total > 0 ? logs[total - 1].timestamp : null;

  // ---- ACESSOS POR DIA ----
  const byDay = {};
  logs.forEach(log => {
    const date = log.timestamp.split("T")[0];
    byDay[date] = (byDay[date] || 0) + 1;
  });

  const days = Object.keys(byDay).length;
  const averagePerDay = days > 0 ? Number((total / days).toFixed(1)) : 0;

  // ---- PICO DE ACESSOS DE HOJE (POR HORA) ----
  const hourCount = {};
  todayLogs.forEach(log => {
    const hour = new Date(log.timestamp).getHours();
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });

  let peakHourToday = null;
  let max = 0;

  for (const hour in hourCount) {
    if (hourCount[hour] > max) {
      max = hourCount[hour];
      peakHourToday = `${hour.padStart(2, "0")}:00`;
    }
  }


  const byDevice = {};
  logs.forEach(log => {
    byDevice[log.deviceType] = (byDevice[log.deviceType] || 0) + 1;
  });


  const byBrowser = {};
  logs.forEach(log => {
    byBrowser[log.browser] = (byBrowser[log.browser] || 0) + 1;
  });

  res.json({
    total,
    today,
    lastAccess,
    averagePerDay,
    peakHourToday,
    byDevice,
    byBrowser,
    byDay
  });
});

// ===============================
// INICIALIZA O SERVIDOR
// ===============================
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
