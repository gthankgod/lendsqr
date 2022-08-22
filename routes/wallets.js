const express = require('express');
const wallets = require('../controllers/wallets');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.use(authorize);

router.get('/balance', wallets.getBalance);
router.post('/fund', wallets.fund);
router.post('/transfer', wallets.transfer);
router.post('/withdraw', wallets.withdraw);

module.exports = router;
