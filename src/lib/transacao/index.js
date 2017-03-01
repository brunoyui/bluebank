'use strict';

let models = require('../../models');
const sequelize = models.sequelize;

const transferirFundos = (contaSrc, contaDest, valor) =>
{
  let contaCorrenteSrc = null, contaCorrenteDest = null, transacao = null;

  return sequelize.transaction( {autocommit: true,
      isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, (t1) =>
      {
        return Promise.all ([
          models.contaCorrente.findOne( { where: { cpf: contaSrc.cpf, numeroConta: contaSrc.numeroConta, codigoAgencia: contaSrc.codigoAgencia }}, {transaction: t1} ),
          models.contaCorrente.findOne( { where: { cpf: contaDest.cpf, numeroConta: contaDest.numeroConta, codigoAgencia: contaDest.codigoAgencia }}, {transaction: t1})
        ]).then( ([conta1, conta2]) => {
          contaCorrenteSrc = conta1;
          contaCorrenteDest = conta2;

          if ( (contaCorrenteSrc.id != '0' && parseFloat(contaCorrenteSrc.saldo) >= parseFloat(valor)) && contaCorrenteDest.id != '0')
          {

            return models.transacao.create(
              {
                id: 1,
                valor: parseFloat(valor),
                data: '2017-01-01',
                conta_src: contaCorrenteSrc.id,
                conta_dest: contaCorrenteDest.id
              }, {transaction: t1}).then( transacaoInserida => {

                if(transacaoInserida.id != '0')
                {
                  contaCorrenteSrc.saldo = contaCorrenteSrc.saldo - valor;
                  contaCorrenteDest.saldo = contaCorrenteDest.saldo + valor;

                  return Promise.all ([
                    contaCorrenteSrc.update( {saldo: contaCorrenteSrc.saldo}, {transaction: t1}),
                    contaCorrenteDest.update( {saldo: contaCorrenteDest.saldo}, {transaction: t1})
                  ]).then ( ([conta1, conta2]) => {
                    return "OK";
                  });
                }
                else
                {
                  throw new Error();
                }
             });
          }
          else
          {
            throw new Error();
          }
        });
      }).then ( result => {
        return result;
      }).catch(err => {
        return err;
      });

};

module.exports.transferirFundos = transferirFundos;
