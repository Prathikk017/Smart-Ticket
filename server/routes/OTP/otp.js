const express = require('express');
const router = express.Router();

const { otp } = require('../../controllers/OTP/otp');

router.route('/').post(otp);

module.exports = router;
