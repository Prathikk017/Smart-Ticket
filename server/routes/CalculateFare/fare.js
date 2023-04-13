const express = require('express');
const router = express.Router();

const { Fare } = require('../../controllers/CalculateFare/fare');

router.route('/').post(Fare);

module.exports = router;
