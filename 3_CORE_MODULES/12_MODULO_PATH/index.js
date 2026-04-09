const path = require("path");

const customPath = "/relatorios/bruno/relatorio1.pdf";

const fileName = path.basename(customPath);
const dirName = path.dirname(customPath);
const extName = path.extname(customPath);

console.log("File Name:", fileName);
console.log("Directory Name:", dirName);
console.log("Extension Name:", extName);
