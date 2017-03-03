'use strict';

const router = require('express').Router();
const ContaCorrente = require('../../models').contaCorrente;


router.get('/', (req, res, next) => {
  console.log('conta router');
  ContaCorrente.findAll()
    .then( result => res.json(result))
    .catch( err => res.status(412));
});

module.exports = router;
