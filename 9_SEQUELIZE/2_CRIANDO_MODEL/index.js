const express = require("express");
const handlebars = require("express-handlebars");
const connection = require("./db/connection");
const User = require("./models/User");

const app = express();

// Configuração do Handlebars
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados de formulários
app.use(express.json()); // Middleware para processar dados JSON
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

connection
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
