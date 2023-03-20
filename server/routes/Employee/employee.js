const express = require('express');
const router = express.Router();

const { create } = require('../../controllers/Employee/employee');

router.route('/create').post(create);


module.exports = router;
