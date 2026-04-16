const mysql = require("mysql2");

// Configuração do pool de conexões - substitui a conexão direta com o banco de dados
// O pool de conexões gerencia um conjunto de conexões ativas com o banco de dados,
// permitindo que múltiplas requisições sejam atendidas simultaneamente sem a
// necessidade de criar uma nova conexão para cada requisição
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexões no pool
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql2",
});

module.exports = pool;
