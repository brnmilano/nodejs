const fs = require("fs");
const arquivoAntigo = "arquivo.txt";
const novoArquivo = "novo_arquivo.txt";

fs.rename(arquivoAntigo, novoArquivo, (err) => {
  if (err) {
    console.error("Erro ao renomear o arquivo:", err);
  } else {
    console.log("Arquivo renomeado com sucesso!");
  }
});
