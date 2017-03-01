'use strict';

process.env.NODE_ENV = 'test';

describe('ContaCorrente', () => {
  const ContaCorrente = require('../../../src/models').contaCorrente,
  expect = require('chai').expect,
  contaCorrente1 = {
    id: 1,
    cpf: '12345678901',
    numeroConta: 1,
    codigoAgencia: 1,
    saldo: 0.0
  },
  contaCorrente2 = {
    id: 2,
    cpf: '09876543210',
    numeroConta: 2,
    codigoAgencia: 2,
    saldo: 40.0
  };

  beforeEach( done => {
    ContaCorrente.sync();
    ContaCorrente.destroy({ where: {} })
    .then( () => ContaCorrente.create(contaCorrente1))
    .then( () => ContaCorrente.create(contaCorrente2))
    .then( () => {
      done();
    });
  });
  
  it('Create conta corrente', done =>
  {
    ContaCorrente.create({id: 10, cpf: '12345678901', numeroConta: 10, codigoAgencia: 1 , saldo: 0.0 })
      .then( (contaCorrente) =>
      {
        expect(contaCorrente.numeroConta).to.equal('10');
        expect(contaCorrente.cpf).to.equal('12345678901');
        expect(contaCorrente.codigoAgencia).to.equal('1');
        done();
      });
  });

  it('List contas', done =>
  {
    ContaCorrente.findAll()
      .then( (contas) =>
      {
        expect(contas.length).to.equal(2);
        expect(contas.filter( (conta) =>
        {
          return conta.id == 1
        }).length).to.equal(1);

        done();
      });
  });

  it('Search exist conta by cpf/conta/agencia', done => {
    ContaCorrente.findOne( { where: { cpf: '12345678901', numeroConta: 1, codigoAgencia: 1 }})
      .then( (conta) =>
      {
        expect(conta).to.be.not.null;
        expect(conta).to.be.a.object;
        expect(conta.id).to.equal('1');
        done();
      });
  });
});
