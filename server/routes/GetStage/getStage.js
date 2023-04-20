const express = require('express');
const router = express.Router();

const {
	getRouteId,
	getStages,
	ARFlag,
} = require('../../controllers/GetStage/getStage');

router.route('/routeID').post(getRouteId);
router.route('/').post(getStages);
router.route('/arflag').post(ARFlag);

module.exports = router;
