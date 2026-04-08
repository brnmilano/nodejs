const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual é o seu nome? ", (name) => {
  console.log(`Olá, ${name}!`);

  rl.close();
});
