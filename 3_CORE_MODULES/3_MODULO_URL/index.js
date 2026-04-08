const url = require("url");
const address = "https://www.meusite.com.br/catalog?produtos=cadeira";
const parsedUrl = new url.URL(address);

console.log(parsedUrl.host); // www.meusite.com.br
console.log(parsedUrl.pathname); // /catalog
console.log(parsedUrl.search); // ?produtos=cadeira
console.log(parsedUrl.searchParams.get("produtos")); // cadeira
