const express = require('express');
const router = express.Router();

const { searchOperator, searchStage, searchRoute } = require('../../controllers/BusPass/busPass');

router.route('/operatorfilter').post(searchOperator);
router.route('/stagefilter').post(searchStage);
router.route('/routefilter').post(searchRoute);

module.exports = router;