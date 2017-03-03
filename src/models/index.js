'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];
var cfenv = require('cfenv');

var vcapLocal;
var connectionString;
var ca;

try {
  vcapLocal = require('../vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {};

const appenv = cfenv.getAppEnv(appEnvOpts);

var services = appenv.services['compose-for-postgresql'];

var sequelize = {};

if (services)
{
  var credentials = services[0].credentials;
  ca = new Buffer(credentials.ca_certificate_base64, 'base64');
  connectionString = credentials.uri;
}

var db = {};

if(env == 'test')
{
  sequelize = new Sequelize (config.database, config.username, config.password, config);
}
else
{
  sequelize = new Sequelize (connectionString, {
    dialectOptions: { ssl: true},
    dialect: 'postgres'
  });
}

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
