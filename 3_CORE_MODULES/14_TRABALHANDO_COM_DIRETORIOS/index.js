const fs = require("fs");

if (!fs.existsSync("./pasta")) {
  fs.mkdirSync("./pasta");
  console.log("Pasta criada com sucesso!");
} else {
  console.log("A pasta já existe!");
}
