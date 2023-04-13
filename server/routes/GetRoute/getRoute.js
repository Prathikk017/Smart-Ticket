const express = require('express');
const router = express.Router();

const { Route } = require('../../controllers/GetRoute/getRoute');

router.route('/').get(Route);

module.exports = router;
