'use strict';

process.env.NODE_ENV = 'test';

describe('Transacao Lib', () =>
{
  const Transacao = require('../../../src/models').transacao,
  ContaCorrente = require('../../../src/models').contaCorrente,
  expect = require('chai').expect,
  TransacaoLib = require('../../../src/services/transacao'),
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
    Transacao.sync();
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
      expect(result.status).to.equal(1);
      expect(result.data).to.be.not.null;
      expect(result.data.id).to.be.not.null;
      expect(result.data.id).to.not.equal('0');
      expect(result.data.valor).to.equal(20.0);

      /* Validação dos saldos das contas */
      Promise.all( [
        ContaCorrente.findOne( { where: { id: 1}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(60.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        }),
        ContaCorrente.findOne( { where: { id: 2}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(120.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        })
      ]).then( () =>
      {
        done();
      });
    });
  });

  it('Transferir fundos saldo conta correnteSrc insuficiente', done =>
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

    TransacaoLib.transferirFundos(contaCorrenteSrc, contaCorrenteDest, 100.0).then( result =>
    {
      console.log(result);
      expect(result.data.error).to.not.be.null;
      expect(result.status).to.equal(-1);
      expect(result.data.error).to.equal('saldo insuficiente');

      /* Validação dos saldos das contas */
      Promise.all( [
        ContaCorrente.findOne( { where: { id: 1}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(80.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        }),
        ContaCorrente.findOne( { where: { id: 2}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(100.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        })
      ]).then( () =>
      {
        done();
      });
    });
  });

  it('Transferir fundos conta correnteDest nao existe', done =>
  {
    const contaCorrenteSrc = {
      cpf: '12345678901',
      numeroConta: 1,
      codigoAgencia: 1
    },
    contaCorrenteDest = {
      cpf: '09876543210',
      numeroConta: 41,
      codigoAgencia: 2
    };

    TransacaoLib.transferirFundos(contaCorrenteSrc, contaCorrenteDest, 20.0).then( result =>
    {
      console.log(result);
      expect(result.data.error).to.not.be.null;
      expect(result.status).to.equal(-1);
      expect(result.data.error).to.equal('conta destino nao existe');

      /* Validação dos saldos das contas */
      Promise.all( [
        ContaCorrente.findOne( { where: { id: 1}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(80.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        }),
        ContaCorrente.findOne( { where: { id: 2}}).then ( conta =>
        {
          expect(conta.saldo).to.equal(100.0);
        }).catch(err =>
        {
          expect(err).to.be.null;
        })
      ]).then( () =>
      {
        done();
      });
    });
  });
});
