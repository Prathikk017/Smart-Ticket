const express = require('express');
const router = express.Router();

const { login } = require('../../controllers/Login/login');

router.route('/').post(login);

module.exports = router;
