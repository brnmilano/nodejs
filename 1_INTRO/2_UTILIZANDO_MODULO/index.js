const fs = require("fs"); // file system

fs.readFile("arquivo.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  console.log("Conteúdo do arquivo:", data);
});
