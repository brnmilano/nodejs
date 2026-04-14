require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT; // VARIÁVEL DE AMBIENTE

const path = require("path");
const basePath = path.join(__dirname, "templates");

const checkAuth = (req, res, next) => {
  req.authStatus = true; // Simulando que o usuário está autenticado

  if (req.authStatus) {
    console.log("Usuário autenticado, prossiga");
    next(); // Chama o próximo middleware ou rota
  } else {
    console.log("Usuário não autenticado, acesso negado");
  }
};

app.use(checkAuth); // Middleware global para todas as rotas

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
