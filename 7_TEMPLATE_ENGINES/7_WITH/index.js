const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item 1", "Item 2", "Item 3"];

  res.render("dashboard", { items: items });
});

app.get("/posts", (req, res) => {
  const post = {
    title: "Aprendendo NodeJS",
    category: "JavaScript",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
    comments: 4,
  };

  res.render("posts", { post: post });
});

app.get("/", (req, res) => {
  const user = {
    name: "João",
    surname: "Silva",
  };

  const auth = true;
  const approved = true;

  res.render("home", { user: user, auth, approved });
});

app.listen(3000, () => {
  console.log({ message: "APP funcionando na porta 3000" });
});
