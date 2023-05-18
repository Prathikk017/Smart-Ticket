const express = require('express');
const router = express.Router();

const {
	createEmployee,
	readEmployee,
	getEmployeeById,
	deleteEmployee,
	updateEmployee,
	getRouteId,
	astroid,
	tripAmounnt,
	readEmpActive,
	reademployeeIntId,
} = require('../../controllers/Employee/employee');

router.route('/create').post(createEmployee);
router.route('/reademp').post(readEmployee);
router.route('/:EmpId').get(getEmployeeById);
router.route('/empread/:EmpId').get(getEmployeeById);
router.route('/update/:EmpId').patch(updateEmployee);
router.route('/delete/:EmpId').patch(deleteEmployee);
router.route('/routeid').post(getRouteId);
router.route('/astroid').post(astroid);
router.route('/tripamount').post(tripAmounnt);
router.route('/readempactive').post(readEmpActive);
router.route('/check/:EmpIntId').get(reademployeeIntId)

module.exports = router;
