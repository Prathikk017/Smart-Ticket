const express = require('express');
const router = express.Router();

const { getOperator, createOperator, getAllOperators, getOperators, validateOperator, createAsset, createQrcodeAsset, readAsset, deleteAsset, updateAsset, createStage, createRoute, validateStage, readRoute, readStage, createRoutemap, getAssetById } = require('../../controllers/Operator/operator');

router.route('/readId').get(getOperator);
router.route('/create').post(createOperator);
router.route('/read').get(getAllOperators);
router.route('/:OperId').get(getOperators);
router.route('/operatorvalidate').post(validateOperator);
router.route('/astcreate').post(createAsset);
router.route('/createqrcode').post(createQrcodeAsset);
router.route('/readast').post(readAsset);
router.route('/asset/:AstId').get(getAssetById);
router.route('/astread/:AstId').get(getAssetById);
router.route('/delete/:AstId').patch(deleteAsset);
router.route('/asset/update/:AstId').patch(updateAsset);
router.route('/stagecreate').post(createStage);
router.route('/stagevalidate').post(validateStage);
router.route('/readstage').post(readStage);
router.route('/routecreate').post(createRoute);
router.route('/readroute').post(readRoute);
router.route('/createroutemap').post(createRoutemap);

// router.route('/generate-qr-code').post(createQrcodeAsset);


module.exports = router;