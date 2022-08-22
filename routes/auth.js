const express = require('express');
const validate = require('express-joi-validation').createValidator({});
const router = express.Router();
const controller = require('../controllers/auth');
const { login, register } = require('../utils/validate');

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
