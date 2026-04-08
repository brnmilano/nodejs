const x = "5";

// chegar se x é um número
if (!Number.isInteger(x)) {
  throw new Error("O valor de x deve ser um número inteiro");
}

console.log("O valor de x é:", x);
