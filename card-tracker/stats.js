const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "logs.json");

function loadLogs() {
  if (!fs.existsSync(LOG_FILE)) {
    console.log("Nenhum log encontrado ainda.");
    process.exit(0);
  }

  const content = fs.readFileSync(LOG_FILE, "utf-8");
  if (!content.trim()) {
    console.log("Arquivo de log vazio.");
    process.exit(0);
  }

  return JSON.parse(content);
}

function countBy(list, key) {
  return list.reduce((acc, item) => {
    const value = item[key] || "desconhecido";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function isToday(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

const logs = loadLogs();

console.log("\n=== ESTATÍSTICAS DO CARTÃO ===\n");

console.log(`Total de acessos: ${logs.length}`);
console.log(`Acessos hoje: ${logs.filter(log => isToday(log.timestamp)).length}\n`);

console.log("Acessos por dispositivo:");
const byDevice = countBy(logs, "deviceType");
for (const device in byDevice) {
  console.log(`- ${device}: ${byDevice[device]}`);
}

console.log("\nAcessos por navegador:");
const byBrowser = countBy(logs, "browser");
for (const browser in byBrowser) {
  console.log(`- ${browser}: ${byBrowser[browser]}`);
}

console.log("");
