'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var db = {};
var sequelize = new Sequelize (config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(function(file){
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file){
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['transacao'].belongsTo(db['contaCorrente'], { as: 'contaSrc', foreignKey: 'conta_src'});
db['transacao'].belongsTo(db['contaCorrente'], { as: 'contaDest', foreignKey: 'conta_dest'});


module.exports = db;
