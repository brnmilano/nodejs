import inquirer from "inquirer";
import chalk from "chalk";

inquirer
  .prompt([
    {
      name: "name",
      message: "Qual o seu nome?",
    },
    {
      name: "age",
      message: "Qual a sua idade?",
    },
  ])
  .then((answers) => {
    console.log(
      chalk.bgYellow.black(
        `Olá, ${answers.name}! Você tem ${answers.age} anos.`,
      ),
    );
  })
  .catch((err) => console.log(err));
