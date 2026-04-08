const fs = require("fs");

console.log("Iniciando a leitura do arquivo...");

fs.writeFileSync("arquivo.txt", "Conteúdo do arquivo");

console.log("Fim.");
