'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.use('/transacao', require('./routes/transacao'));

module.exports = app;
