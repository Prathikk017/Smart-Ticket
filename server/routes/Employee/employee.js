const express = require('express');
const router = express.Router();

const { createEmployee, readEmployee, getEmployeeById, deleteEmployee } = require('../../controllers/Employee/employee');

router.route('/create').post(createEmployee);
router.route('/reademp').post(readEmployee);
router.route('/:EmpId').get(getEmployeeById);
router.route('/delete/:EmpId').patch(deleteEmployee);

module.exports = router;
