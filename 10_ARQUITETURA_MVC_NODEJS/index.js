/* APLICAÇÃO EXPRESS COM MVC */
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const connection = require("./db/connection");

/* IMPORTAÇÃO DE MODELOS E ROTAS:
- Task = Modelo Sequelize que define a estrutura da tabela de tarefas no banco de dados.
- tasksRoutes = Módulo contendo todas as rotas relacionadas a operações CRUD de tarefas.
*/
const Task = require("./models/Task");
const tasksRoutes = require("./routes/taskRoutes");

/* CONFIGURAÇÃO DE VIEW ENGINE:
- Define o Handlebars como template engine para renderizar arquivos .handlebars
- app.engine() registra o engine personalizado
- app.set() define qual engine será usado por padrão
*/
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

/* MIDDLEWARE - ARQUIVOS ESTÁTICOS:
- Serve arquivos estáticos (CSS, JS, imagens, etc.) da pasta "public".
- Qualquer arquivo em public/ será acessível diretamente sem rota específica.
*/
app.use(express.static("public"));

/* MIDDLEWARE - PROCESSAMENTO DE DADOS:
- Middleware para processar dados de formulários HTML (application/x-www-form-urlencoded).
- express.urlencoded({ extended: true }) = true permite objetos complexos e arrays nos dados do formulário
- express.json() = Middleware para processar dados em formato JSON (application/json)
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ROTAS:
- Rota GET para a página inicial.
- Renderiza a view "home" (arquivo home.handlebars).
*/
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/tasks", tasksRoutes);

/* SINCRONIZAÇÃO DO BANCO DE DADOS E CONFIGURAÇÃO DO SERVIDOR:
- connection.sync() = Sincroniza os modelos com o banco de dados, criando as tabelas se necessário.
- force: false = Não força a recriação das tabelas, preservando os dados existentes.
*/
const PORT = process.env.PORT || 3000;

connection
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
