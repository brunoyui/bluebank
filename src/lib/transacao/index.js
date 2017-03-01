'use strict';

let models = require('../../models');
const sequelize = models.sequelize;

const responseDefault = (data, status = 1) => ( {data, status });
const responseError = (message, status = -1) => responseDefault( { error: message} , status);

const transferirFundos = (contaSrc, contaDest, valor) =>
{
  let contaCorrenteSrc = null, contaCorrenteDest = null, transacao = null, responseReturn;

  return sequelize.transaction( {autocommit: true,
      isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED }, (t1) =>
      {
        return Promise.all ([
          models.contaCorrente.findOne( { where: { cpf: contaSrc.cpf, numeroConta: contaSrc.numeroConta, codigoAgencia: contaSrc.codigoAgencia }}, {transaction: t1} ),
          models.contaCorrente.findOne( { where: { cpf: contaDest.cpf, numeroConta: contaDest.numeroConta, codigoAgencia: contaDest.codigoAgencia }}, {transaction: t1})
        ]).then( ([conta1, conta2]) => {
          contaCorrenteSrc = conta1;
          contaCorrenteDest = conta2;

          if ( (contaCorrenteSrc != null && contaCorrenteSrc.id != '0' && parseFloat(contaCorrenteSrc.saldo) >= parseFloat(valor)))
          {
            if (contaCorrenteDest != null && contaCorrenteDest.id != '0')
            {
              return models.transacao.create(
              {
                valor: parseFloat(valor),
                data: new Date(),
                conta_src: contaCorrenteSrc.id,
                conta_dest: contaCorrenteDest.id
              }, {transaction: t1}).then( transacaoInserida => {

                if(transacaoInserida != null && transacaoInserida.id != '0')
                {

                  contaCorrenteSrc.saldo = contaCorrenteSrc.saldo - valor;
                  contaCorrenteDest.saldo = contaCorrenteDest.saldo + valor;

                  responseReturn = responseDefault(transacaoInserida);

                  return Promise.all ([
                    contaCorrenteSrc.update( {saldo: contaCorrenteSrc.saldo}, {transaction: t1}),
                    contaCorrenteDest.update( {saldo: contaCorrenteDest.saldo}, {transaction: t1})
                  ]).then ( ([conta1, conta2]) => {
                    return responseReturn;
                  });
                }
                else
                {
                  throw new Error('transacao nao criada');
                }
              });
            }
            else
            {
              throw new Error('conta destino nao existe');
            }
          }
          else
          {
            throw new Error('saldo insuficiente');
          }
        });
      }).then ( result => {
        return result;
      }).catch(err => {
        return responseError(err.message);
      });
};

module.exports.transferirFundos = transferirFundos;
