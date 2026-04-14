const express = require("express");
const router = express.Router();

const path = require("path");
const basePath = path.join(__dirname, "../templates");

// ROTA PARA CRIAR UM NOVO USUÁRIO
router.get("/create", (req, res) => {
  res.sendFile(`${basePath}/userForm.html`);
});

// ROTA PARA SALVAR UM NOVO USUÁRIO
router.post("/save", (req, res) => {
  // Criar um novo usuário, como ler os dados do corpo da requisição e salvar no banco de dados.

  const name = req.body.name;
  const email = req.body.email;

  console.log(`Criando usuário: ${name}, email: ${email}`);

  res.send("Usuário criado com sucesso!");
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  // Leitura da tabela de usuários, permite resgatar o usuário do banco de dados.

  console.log(`Buscando usuário com ID: ${userId}`);

  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;
