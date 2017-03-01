'use strict';

process.env.NODE_ENV = 'test';

describe('Route for transaction operations /transacao', () => {

  const contaCorrente1 = {
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
  Transacao = require('../../../src/models').transacao,
  ContaCorrente = require('../../../src/models').contaCorrente;

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

  // transaction?action=transfer
  it('should return transacao for transfer operation and status 1', done => {
    const contaSrc = {
      cpf: '12345678901',
      numeroConta: 1,
      codigoAgencia: 1
    },
    contaDest = {
      cpf: '09876543210',
      numeroConta: 2,
      codigoAgencia: 2
    },
    contas =
    {
      contaSrc, contaDest, valor: 10.0
    };

    request
      .post('/transacao/transfer')
      .send(contas)
      .end( (err, res) =>
      {
        expect(res.body.status).to.equal(1);
        expect(res.body.data).to.not.be.undefined;
        expect(res.body.data.id).to.not.be.undefined;
        expect(res.body.data.id).to.not.equal(0);
        expect(res.body.data.valor).to.equal(10.0);
        expect(res.body.data.conta_src).to.equal('1');
        expect(res.body.data.conta_dest).to.equal('2');

        done(err);
      });
  });
});
