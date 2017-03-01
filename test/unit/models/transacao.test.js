'use strict';

process.env.NODE_ENV = 'test';

describe('Transacao', () =>
{
  const Transacao = require('../../../src/models').transacao,
  ContaCorrente = require('../../../src/models').contaCorrente,
  expect = require('chai').expect,
  contaCorrente1 = {
    id: 1,
    cpf: '12345678901',
    numeroConta: 1,
    codigoAgencia: 1,
    saldo: 100.0
  },
  contaCorrente2 = {
    id: 2,
    cpf: '09876543210',
    numeroConta: 2,
    codigoAgencia: 2,
    saldo: 40.0
  },
  transacao1 = {
    id: 1,
    valor: 20.0,
    data: '2017-01-01',
    conta_src: contaCorrente1.id,
    conta_dest: contaCorrente2.id
  },
  transacao2 = {
    id: 2,
    valor: 40.0,
    data: '2017-01-01',
    conta_src: contaCorrente2.id,
    conta_dest: contaCorrente1.id
  };

  beforeEach( done => {
    ContaCorrente.sync();
    Transacao.sync();
    ContaCorrente.destroy({ where: {} })
      .then( () => ContaCorrente.create(contaCorrente1))
      .then( () => ContaCorrente.create(contaCorrente2))
      .then( () => Transacao.destroy( {where: {} })
        .then( () => Transacao.create(transacao1))
        .then( () => {
          done();
        }));
  });

  it('Create transacao', done =>
  {
    Transacao.create(transacao2).then( () => {
        done();
    });
  });
});
