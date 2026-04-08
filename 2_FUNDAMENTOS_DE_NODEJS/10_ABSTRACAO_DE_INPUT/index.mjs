import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "p1",
      message: "Qual a primeira nota?",
    },
    {
      name: "p2",
      message: "Qual a segunda nota?",
    },
  ])
  .then((answers) => {
    console.log(answers);

    const media = (parseFloat(answers.p1) + parseFloat(answers.p2)) / 2;

    if (media >= 7) {
      console.log(`Você foi aprovado. Sua média foi: ${media}!`);
    } else {
      console.log(`Você foi reprovado. Sua média foi: ${media}.`);
    }
  })
  .catch((err) => console.log(err));
