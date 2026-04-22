const express = require("express");
const handlebars = require("express-handlebars");
const connection = require("./db/connection");
const User = require("./models/User");
const Address = require("./models/Address");

const app = express();

// Configuração do Handlebars
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados de formulários
app.use(express.json()); // Middleware para processar dados JSON
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Rotas para criar usuário e exibir formulário de criação de usuário
// Essa rota é uma tela para criar um novo usuário, onde o formulário é enviado para a rota POST /users/create
app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.post("/users/create", async (req, res) => {
  const { name, occupation, newsletter } = req.body;

  try {
    await User.create({
      name,
      occupation,
      newsletter: newsletter === "on", // Converte o valor para booleano
    });
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário");
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // O método findByPk é usado para encontrar um usuário pelo seu ID (chave primária)
    const user = await User.findByPk(userId, { raw: true });

    console.log(user);

    if (user) {
      res.render("userview", { user });
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).send("Erro ao buscar usuário");
  }
});

app.post("/users/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // O método destroy é usado para excluir um usuário do banco de dados com base no ID fornecido
    await User.destroy({ where: { id: userId } });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);

    res.status(500).send("Erro ao excluir usuário");
  }
});

app.get("/users/edit/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      // O parâmetro include é usado para incluir os dados relacionados do modelo
      // Address ao buscar um usuário. Isso permite que você acesse os endereços
      // associados a um usuário específico.
      include: Address,
    });

    if (user) {
      // O método get({ plain: true }) é usado para obter os dados do usuário
      // como um objeto JavaScript simples, em vez de uma instância do modelo Sequelize.
      // Isso facilita o acesso aos dados e a renderização na view.
      res.render("useredit", { user: user.get({ plain: true }) });
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar usuário para edição:", error);
    res.status(500).send("Erro ao buscar usuário para edição");
  }
});

app.post("/users/update/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, occupation, newsletter } = req.body;

  const userData = {
    id: userId,
    name,
    occupation,
    newsletter: newsletter === "on", // Converte o valor para booleano
  };

  try {
    // O método update é usado para atualizar os dados de um usuário existente no banco de dados com base no ID fornecido
    // UPDATE nome_tabela SET coluna1 = valor1, coluna2 = valor2 WHERE condicao;
    // UPDATE users SET name = 'João Silva', occupation = 'Desenvolvedor' WHERE id = 5;
    await User.update(userData, { where: { id: userId } });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Erro ao atualizar usuário");
  }
});

app.get("/", async (req, res) => {
  // O método findAll retorna uma lista de todos os usuários no banco de dados
  // O parâmetro raw: true é usado para retornar os dados como objetos JavaScript simples, em vez de instâncias do modelo Sequelize.
  // Isso pode ser útil para simplificaro acesso aos dados e evitar a necessidade de usar métodos adicionais para extrair os valores dos campos.
  const users = await User.findAll({ raw: true });

  res.render("home", { users });
});

app.post("/address/create", async (req, res) => {
  const { UserId, street, number, city } = req.body;

  console.log("UserId RECEBIDO:", UserId);

  const addressData = {
    userId: UserId,
    street,
    number,
    city,
  };

  try {
    await Address.create(addressData);

    res.redirect(`/users/edit/${UserId}`);
  } catch (error) {
    console.error("Erro ao criar endereço:", error);
    res.status(500).send("Erro ao criar endereço");
  }
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
