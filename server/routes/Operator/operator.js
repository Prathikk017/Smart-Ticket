const express = require('express');
const router = express.Router();

const { getOperator, createOperator, getAllOperators, getOperators, validateOperator, createAsset, createStage, createRoute, validateStage } = require('../../controllers/Operator/operator');

router.route('/readId').get(getOperator);
router.route('/create').post(createOperator);
router.route('/read').get(getAllOperators);
router.route('/:OperId').get(getOperators);
router.route('/operatorvalidate').post(validateOperator);
router.route('/astcreate').post(createAsset);
router.route('/stagecreate').post(createStage);
router.route('/stagevalidate').post(validateStage);
router.route('/routecreate').post(createRoute);


module.exports = router;