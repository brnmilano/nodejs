import chalk from "chalk";

const nota = 9;

if (nota >= 7) {
  console.log(chalk.green("Parabéns, você foi aprovado!"));
} else {
  console.log(chalk.red("Infelizmente, você foi reprovado."));
}
