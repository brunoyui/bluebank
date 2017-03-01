'use strict';

const router = require('express').Router();
const TransacaoService = require('../../services/transacao');

router.post('/transfer', (req, res, next) =>
{
  TransacaoService.transferirFundos(req.body.contaSrc, req.body.contaDest, req.body.valor)
    .then(result => res.json(result))
    .catch(err => res.status(412));
});

module.exports = router;
