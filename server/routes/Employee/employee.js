const express = require('express');
const router = express.Router();

const { createEmployee, readEmployee } = require('../../controllers/Employee/employee');

router.route('/create').post(createEmployee);
router.route('/reademp').post(readEmployee);

module.exports = router;
