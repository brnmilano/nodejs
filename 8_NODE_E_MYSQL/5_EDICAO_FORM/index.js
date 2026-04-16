const express = require("express");
const handlebars = require("express-handlebars");
const mysql = require("mysql2");

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

// Rota para inserir um novo livro
app.post("/books/insertbook", (req, res) => {
  const { title, pageqty } = req.body;

  console.log("Dados recebidos do formulário:", { title, pageqty });

  // Converter pageqty para número
  const pages = parseInt(pageqty, 10);

  if (isNaN(pages)) {
    console.error("pageqty não é um número válido:", pageqty);
    res.status(400).send("Quantidade de páginas deve ser um número");
    return;
  }

  const sqlQuery = `INSERT INTO books (title, pageqty) VALUES (?, ?)`;

  connection.query(sqlQuery, [title, pages], (error, results) => {
    if (error) {
      console.error("Erro ao inserir livro:", error);
      res.status(500).send("Erro ao inserir livro");

      return;
    }

    console.log("Livro inserido com sucesso:", results);

    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sqlQuery = "SELECT * FROM books";

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).send("Erro ao buscar livros");
      return;
    }

    const books = results;

    console.log("Livros encontrados:", results);

    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sqlQuery = "SELECT * FROM books WHERE id = ?";

  connection.query(sqlQuery, [bookId], (error, results) => {
    if (error) {
      console.error("Erro ao buscar livro:", error);
      res.status(500).send("Erro ao buscar livro");

      return;
    }

    if (results.length === 0) {
      res.status(404).send("Livro não encontrado");

      return;
    }

    const book = results[0];

    console.log("Livro encontrado:", book);

    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const bookId = req.params.id;
  const sqlQuery = "SELECT * FROM books WHERE id = ?";

  connection.query(sqlQuery, [bookId], (error, results) => {
    if (error) {
      console.error("Erro ao buscar livro para edição:", error);
      res.status(500).send("Erro ao buscar livro para edição");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Livro não encontrado para edição");
      return;
    }

    const book = results[0];

    console.log("Livro encontrado para edição:", book);

    res.render("editbook", { book });
  });
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
