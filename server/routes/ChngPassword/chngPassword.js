const express = require('express');
const router = express.Router();

const { chngPassword } = require('../../controllers/ChngPassword/chngPassword');

router.route('/Password').patch(chngPassword);

module.exports = router;
