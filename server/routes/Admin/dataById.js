const express = require('express');
const router = express.Router();

const {
	getAdminById,
	getAssetById,
	getOperatorById,
	getEmployeeById,
	getUserById,
	getTicketTypeById,
} = require('../../controllers/Admin/dataById');

router.route('/:AdminId').get(getAdminById);
router.route('/assets/:AstId').get(getAssetById);
router.route('/operators/:OperId').get(getOperatorById);
router.route('/employees/:EmpId').get(getEmployeeById);
router.route('/users/:UserId').get(getUserById);
router.route('/ticket-types/:TTid').get(getTicketTypeById);

module.exports = router;
