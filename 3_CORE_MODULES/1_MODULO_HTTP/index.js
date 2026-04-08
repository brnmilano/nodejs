const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "text/plain");
  // res.end("Hello, World!\n");

  res.write("Ola HTTP.");
  res.end();
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
