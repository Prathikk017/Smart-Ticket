const express = require('express');
const router = express.Router();

const { setRoute } = require('../../controllers/SetRoute/setRoute');

router.route('/').post(setRoute);

module.exports = router;
