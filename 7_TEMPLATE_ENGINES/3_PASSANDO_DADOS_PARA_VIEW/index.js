const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "João",
    surname: "Silva",
  };

  res.render("home", { user: user });
});

app.listen(3000, () => {
  console.log({ message: "APP funcionando na porta 3000" });
});
