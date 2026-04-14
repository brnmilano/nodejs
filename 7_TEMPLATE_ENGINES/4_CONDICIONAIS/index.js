const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const user = {
    name: "Mateus",
    surname: "Santos",
  };

  res.render("dashboard", { user: user, auth });
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
