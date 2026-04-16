const express = require("express");
const handlebars = require("express-handlebars");
const pool = require("./db/connection");

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

  // Validar título
  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length === 0 ||
    title.length > 255
  ) {
    console.error("Título inválido:", title);
    res
      .status(400)
      .send("Título inválido ou muito longo (máximo 255 caracteres)");
    return;
  }

  // Converter pageqty para número
  const pages = parseInt(pageqty, 10);

  if (isNaN(pages) || pages < 0) {
    console.error("pageqty não é um número válido:", pageqty);
    res
      .status(400)
      .send("Quantidade de páginas deve ser um número válido e não negativo");
    return;
  }

  // O INSERT INTO indica que queremos inserir um novo registro na tabela books, enquanto os valores title e pageqty são passados como parâmetros para evitar SQL Injection
  const sqlQuery = `INSERT INTO books (title, pageqty) VALUES (?, ?)`;

  pool.query(sqlQuery, [title.trim(), pages], (error, results) => {
    if (error) {
      console.error("Erro ao inserir livro:", error);
      res.status(500).send("Erro ao inserir livro");

      return;
    }

    console.log("Livro inserido com sucesso:", results);

    res.redirect("/books");
  });
});

// Rota para listar todos os livros
app.get("/books", (req, res) => {
  const sqlQuery = "SELECT * FROM books";

  pool.query(sqlQuery, (error, results) => {
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

// Rota para buscar um livro específico por ID
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sqlQuery = "SELECT * FROM books WHERE id = ?";

  pool.query(sqlQuery, [bookId], (error, results) => {
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

// Rota para exibir o formulário de edição de um livro específico
app.get("/books/edit/:id", (req, res) => {
  const bookId = req.params.id;
  const sqlQuery = "SELECT * FROM books WHERE id = ?";

  pool.query(sqlQuery, [bookId], (error, results) => {
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

// Rota para atualizar um livro específico
app.post("/books/updatebook", (req, res) => {
  const { id, title, pageqty } = req.body;

  console.log("Dados recebidos para atualização:", { id, title, pageqty });

  // Validar ID
  const bookId = parseInt(id, 10);
  if (isNaN(bookId) || bookId < 1) {
    console.error("ID inválido:", id);
    res.status(400).send("ID do livro inválido");
    return;
  }

  // Validar título
  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length === 0 ||
    title.length > 255
  ) {
    console.error("Título inválido:", title);
    res
      .status(400)
      .send("Título inválido ou muito longo (máximo 255 caracteres)");
    return;
  }

  const pages = parseInt(pageqty, 10);

  if (isNaN(pages) || pages < 0) {
    console.error("pageqty não é um número válido para atualização:", pageqty);
    res
      .status(400)
      .send("Quantidade de páginas deve ser um número válido e não negativo");
    return;
  }

  // O SET permite atualizar os campos title e pageqty, enquanto o WHERE garante que apenas o livro com o id correspondente seja atualizado
  const sqlQuery = "UPDATE books SET title = ?, pageqty = ? WHERE id = ?";

  pool.query(sqlQuery, [title.trim(), pages, bookId], (error, results) => {
    if (error) {
      console.error("Erro ao atualizar livro:", error);
      res.status(500).send("Erro ao atualizar livro");
      return;
    }

    console.log("Livro atualizado com sucesso:", results);

    res.redirect("/books");
  });
});

// Rota para deletar um livro específico
app.post("/books/remove/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  // Validar ID
  if (isNaN(bookId) || bookId < 1) {
    console.error("ID inválido para deleção:", req.params.id);
    res.status(400).send("ID do livro inválido");
    return;
  }

  // O DELETE FROM indica que queremos deletar um registro da tabela books, enquanto o WHERE id = ? garante que apenas o livro com o id correspondente seja deletado
  const sqlQuery = "DELETE FROM books WHERE id = ?";

  pool.query(sqlQuery, [bookId], (error, results) => {
    if (error) {
      console.error("Erro ao deletar livro:", error);
      res.status(500).send("Erro ao deletar livro");
      return;
    }

    console.log("Livro deletado com sucesso:", results);

    res.redirect("/books");
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
