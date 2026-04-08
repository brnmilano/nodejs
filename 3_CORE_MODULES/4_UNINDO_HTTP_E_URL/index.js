const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (!name) {
    res.end(
      `<h1>Preencha o seu nome: <h1><form method="GET"><input type="text" name="name"><button type="submit">Enviar</button></form>`,
    );
  } else {
    res.end(
      `<h1>Olá, ${name}!</h1><p>Este é um exemplo de servidor HTTP retornando HTML.</p>`,
    );
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
