const express = require('express');
const router = express.Router();

const {

  create,
  find,
  verifyOTP,
  login,
  setPassword,
} = require('../../controllers/Employee/employee');


router.route('/create').post(create);
router.route('/find').post(find);
router.route('/otp').post(verifyOTP);
router.route('/login').post(login);
router.route('/setPassword').post(setPassword);

module.exports = router;