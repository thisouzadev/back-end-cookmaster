const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes');
const err = require('./middlewares/errorHandler');

const app = express();
app.use('/images', express.static(path.join(__dirname, '..', '..', 'uploads')));
app.use(bodyParser.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(router);
app.use(err);
module.exports = app;
