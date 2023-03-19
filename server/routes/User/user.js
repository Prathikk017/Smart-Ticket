const express = require('express');
const router = express.Router();

const {
  register,
  verifyOTP,
  login,
  setPassword,
} = require('../../controllers/User/user');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/otp').post(verifyOTP);
router.route('/setPassword').post(setPassword);

module.exports = router;
