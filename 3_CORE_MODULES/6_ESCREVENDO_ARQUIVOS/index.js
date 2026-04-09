const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((req, response) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("index.html", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);

      return response.end();
    });
  } else {
    fs.writeFile("arquivo.txt", name, function (err, data) {
      response.writeHead(302, {
        Location: "/",
      });
      return response.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
