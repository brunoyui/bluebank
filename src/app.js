'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models');

models.sequelize.sync();

const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());


app.use('/api/transacoes', require('./routes/transacao'));
app.use('/api/contas', require('./routes/conta'));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../clientapp/dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../clientapp/dist/index.html'));
});


module.exports = app;
