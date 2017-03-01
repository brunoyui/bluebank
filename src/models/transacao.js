'use strict';

let transacao = null;

transacao = (sequelize, DataTypes) =>
{
  const Transacao = sequelize.define ('transacao', {
    id: {type : DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    valor: {type : DataTypes.DOUBLE },
    data: {type: DataTypes.DATE}
  },
  {
    tableName: 'transacao'
  }
);

  return Transacao;
}

module.exports = transacao;
