const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <html>
      <head>
        <title>Retornando HTML</title>
      </head>
      
      <body>
        <h1>Olá, mundo!</h1>
        <p>Este é um exemplo de servidor HTTP retornando HTML.</p>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}/`);
});
