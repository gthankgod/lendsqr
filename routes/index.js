const express = require('express');
const wallets = require('./wallets');
const auth = require('./auth');

const router = express.Router();

router.use('/wallets', wallets);
router.use('/auth', auth);

module.exports = router;

