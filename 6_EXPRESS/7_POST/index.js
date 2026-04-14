require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT; // VARIÁVEL DE AMBIENTE

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.use(express.urlencoded({ extended: true })); // HABILITA O EXPRESS PARA ENTENDER DADOS DE FORMULÁRIOS
app.use(express.json()); // HABILITA O EXPRESS PARA ENTENDER DADOS EM JSON

// ROTA PARA CRIAR UM NOVO USUÁRIO
app.get("/users/create", (req, res) => {
  res.sendFile(`${basePath}/userForm.html`);
});

// ROTA PARA SALVAR UM NOVO USUÁRIO
app.post("/users/save", (req, res) => {
  // Criar um novo usuário, como ler os dados do corpo da requisição e salvar no banco de dados.

  const name = req.body.name;
  const email = req.body.email;

  console.log(`Criando usuário: ${name}, email: ${email}`);

  res.send("Usuário criado com sucesso!");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  // Leitura da tabela de usuários, permite resgatar o usuário do banco de dados.

  console.log(`Buscando usuário com ID: ${userId}`);

  res.sendFile(`${basePath}/users.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
