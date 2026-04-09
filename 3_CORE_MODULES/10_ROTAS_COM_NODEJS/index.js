const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, response) => {
  const q = url.parse(req.url, true);
  const fileName = q.pathname.substring(1);

  if (fileName.includes("html")) {
    if (fs.existsSync(fileName)) {
      fs.readFile(fileName, (err, data) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);

        return response.end();
      });
    } else {
      fs.readFile("404.html", (err, data) => {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(data);

        return response.end();
      });
    }
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
