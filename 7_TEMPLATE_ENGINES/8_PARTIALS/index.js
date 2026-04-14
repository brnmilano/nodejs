const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

const hbs = handlebars.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
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

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprendendo NodeJS",
      category: "JavaScript",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
      comments: 4,
    },
    {
      title: "Aprendendo ExpressJS",
      category: "JavaScript",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
      comments: 2,
    },
    {
      title: "Aprendendo Handlebars",
      category: "JavaScript",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",
      comments: 0,
    },
  ];

  res.render("blog", { posts: posts });
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
