const minimist = require("minimist");

// MODULO EXTERNO
const args = minimist(process.argv.slice(2));

// MODULO INTERNO
const soma = require("./soma").soma;

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

soma(a, b);
