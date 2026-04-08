const fs = require("fs");

console.log("Iniciando a leitura do arquivo...");

fs.writeFile("arquivo1.txt", "Conteúdo do arquivo", (err) => {
  setTimeout(() => {
    console.log("Arquivo escrito com sucesso!");
  }, 2000);
});

console.log("Fim.");
