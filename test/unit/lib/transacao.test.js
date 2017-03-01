'use strict';

process.env.NODE_ENV = 'test';

describe('Transacao Lib', () =>
{
  const Transacao = require('../../../src/models').transacao,
  ContaCorrente = require('../../../src/models').contaCorrente,
  expect = require('chai').expect,
  TransacaoLib = require('../../../src/lib/transacao'),
  contaCorrente1 = {
    id: 1,
    cpf: '12345678901',
    numeroConta: 1,
    codigoAgencia: 1,
    saldo: 80.0
  },
  contaCorrente2 = {
    id: 2,
    cpf: '09876543210',
    numeroConta: 2,
    codigoAgencia: 2,
    saldo: 100.0
  };

  beforeEach( done => {
    ContaCorrente.sync();
    ContaCorrente.destroy({ where: {} })
    .then( () => ContaCorrente.create(contaCorrente1))
    .then( () => ContaCorrente.create(contaCorrente2))
    .then( () => Transacao.destroy( {where: {} }))
    .then( () => {
      done();
    });
  });

  it('Transferir fundos contas válidas', done =>
  {
    const contaCorrenteSrc = {
      cpf: '12345678901',
      numeroConta: 1,
      codigoAgencia: 1
    },
    contaCorrenteDest = {
      cpf: '09876543210',
      numeroConta: 2,
      codigoAgencia: 2
    };

    TransacaoLib.transferirFundos(contaCorrenteSrc, contaCorrenteDest, 20.0).then( result =>
    {
      expect(result).to.be.a.object;
      done();
    });
  });
});
