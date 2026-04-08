const x = 10;

try {
  x = 2;
} catch (error) {
  console.log("Ocorreu um erro: " + error.message);
} finally {
  console.log("Bloco finally executado.");
}

console.log("O programa continua...");
