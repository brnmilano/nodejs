const express = require("express");
const handlebars = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// Configuração do Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql2",
});

connection.connect((error) => {
  if (error) {
    console.error("Erro ao conectar ao MySQL:", error);
    return;
  }
  console.log("Conectado ao MySQL!");

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
});
