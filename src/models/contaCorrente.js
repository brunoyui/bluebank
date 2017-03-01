'use strict';

let contaCorrente = null;

contaCorrente = (sequelize, DataTypes) =>
{
  const ContaCorrente = sequelize.define ('contaCorrente', {
    id: {type : DataTypes.BIGINT, primaryKey: true},
    cpf: {type : DataTypes.STRING },
    numeroConta: {type: DataTypes.BIGINT},
    codigoAgencia: {type: DataTypes.BIGINT},
    saldo: {type: DataTypes.DOUBLE}
  },
  {
    tableName: 'conta_corrente'
  }
);

  return ContaCorrente;
}

module.exports = contaCorrente;
