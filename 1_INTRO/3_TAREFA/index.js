const fs = require("fs"); // file system

const b = [];

fs.readFile("arquivo.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);

    return;
  }

  b.push(data);

  console.log({ b });
});
