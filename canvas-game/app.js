
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {  //req = requisição e res = resposta
  res.sendFile(path.join(__dirname, '/index.html')) //
});

app.use('/public', express.static(__dirname + '/public')); //tudo que ta na pasta public vai ser envido para o servidor
app.use(express.static('public'));  // e fcarão acessives

app.listen(port, () => {
  console.log(`Jogo rodando no http://localhost:${port}`) // local-server onde o jogo esta sendo rodado
});