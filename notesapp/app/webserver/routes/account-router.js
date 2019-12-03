'use strict';

const router = require('express').Router();
const createAccount = require('../controllers/account/create-account-controller-hab');

router.post('/', createAccount);

module.exports = router;
