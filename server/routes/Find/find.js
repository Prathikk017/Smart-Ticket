const express = require('express');
const router = express.Router();

const { findUSER, findEMPLOYEE } = require('../../controllers/Find/find');

router.route('/user').post(findUSER);
router.route('/employee').post(findEMPLOYEE);

module.exports = router;
