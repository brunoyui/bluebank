'use strict';

describe('Route for conta operations /contas', () =>
{
  const ContaCorrente = require('../../../src/models').contaCorrente,
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
  },
  contaCorrente3 = {
    id: 3,
    cpf: '09876543210',
    numeroConta: 2,
    codigoAgencia: 1,
    saldo: 125.32
  };

  beforeEach( done => {
    ContaCorrente.sync();
    ContaCorrente.destroy({ where: {} })
    .then( () => ContaCorrente.create(contaCorrente1))
    .then( () => ContaCorrente.create(contaCorrente2))
    .then( () => ContaCorrente.create(contaCorrente3))
    .then( () => {
      done();
    });
  });

  it('should return a list of contas', done => {
    request
      .get('/api/contas')
      .end( (err, res) =>
      {
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf(3);
        done(err);
      });
  });
});
