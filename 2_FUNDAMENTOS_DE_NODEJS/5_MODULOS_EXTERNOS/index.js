const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

const nome = args["nome"];
const profissao = args["profissao"];

console.log(`Olá, meu nome é ${nome} e minha profissão é ${profissao}.`);
