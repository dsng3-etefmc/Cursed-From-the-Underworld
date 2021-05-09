
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Jogo rodando no http://localhost:${port}`)
});