'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());


app.use('/transacoes', require('./routes/transacao'));
app.use('/contas', require('./routes/conta'));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


module.exports = app;
