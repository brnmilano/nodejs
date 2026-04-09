const path = require("path");

// path absoluto
console.log(path.resolve("teste.txt")); // retorna o caminho absoluto do arquivo teste.txt

// formar path
const midFolder = "relatorios";
const fileName = "relatorio1.pdf";

const finalPath = path.join("/", "arquivos", midFolder, fileName);
console.log(finalPath); // retorna /arquivos/relatorios/relatorio1.pdf
