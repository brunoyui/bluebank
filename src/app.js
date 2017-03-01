'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.use('/transacoes', require('./routes/transacao'));
app.use('/contas', require('./routes/conta'));

module.exports = app;
