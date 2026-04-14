require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT; // VARIÁVEL DE AMBIENTE

const path = require("path");
const basePath = path.join(__dirname, "templates");

const usersRouter = require("./users");
app.use(usersRouter); // REGISTRANDO AS ROTAS DE USUÁRIOS

app.use(express.urlencoded({ extended: true })); // HABILITA O EXPRESS PARA ENTENDER DADOS DE FORMULÁRIOS
app.use(express.json()); // HABILITA O EXPRESS PARA ENTENDER DADOS EM JSON
app.use(express.static("public")); // HABILITA O EXPRESS PARA SERVIR ARQUIVOS ESTÁTICOS DA PASTA "PUBLIC"

app.use("/users", usersRouter); // REGISTRANDO AS ROTAS DE USUÁRIOS

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
