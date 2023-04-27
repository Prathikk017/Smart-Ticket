const express = require('express');
const router = express.Router();

const { getOperator, createOperator, getAllOperators, getOperators, validateOperator, createAsset, createQrcodeAsset, readAsset, readAssetActive, deleteAsset, updateAsset, createStage,  validateStage, readRoute, readStage, readStageTbl, getStageById, deleteStage, updateStage, createRoute, createRoutemap, getAssetById, readTicket , createRouteTicType, readRouteTicType, getOperatorShortName, getRouteById, deleteRoute, updateRoute} = require('../../controllers/Operator/operator');

router.route('/readId').get(getOperator);
router.route('/create').post(createOperator);
router.route('/read').get(getAllOperators);
router.route('/:OperId').get(getOperators);
router.route('/operatorvalidate').post(validateOperator);
router.route('/readoperatorshortname').post(getOperatorShortName);
router.route('/astcreate').post(createAsset);
router.route('/createqrcode').post(createQrcodeAsset);
router.route('/readast').post(readAsset);
router.route('/readastactive').post(readAssetActive);
router.route('/asset/:AstId').get(getAssetById);
router.route('/astread/:AstId').get(getAssetById);
router.route('/asset/delete/:AstId').patch(deleteAsset);
router.route('/asset/update/:AstId').patch(updateAsset);
router.route('/stagecreate').post(createStage);
router.route('/stagevalidate').post(validateStage);
router.route('/readstage').post(readStage);
router.route('/readstg').post(readStageTbl);
router.route('/stage/:StageID').get(getStageById);
router.route('/stage/delete/:StageID').patch(deleteStage);
router.route('/stage/update/:StageID').patch(updateStage);
router.route('/stgread/:StageID').get(getStageById);
router.route('/routecreate').post(createRoute);
router.route('/readroute').post(readRoute);
router.route('/readrut').post(readRoute);
router.route('/route/:RouteID').get(getRouteById);
router.route('/rutread/:RouteID').get(getRouteById);
router.route('/route/delete/:RouteID').patch(deleteRoute);
router.route('/route/update/:RouteID').patch(updateRoute);
router.route('/createroutemap').post(createRoutemap);
router.route('/readticket').post(readTicket);
router.route('/routettypecreate').post(createRouteTicType);
router.route('/readroutetictype').post(readRouteTicType);

// router.route('/generate-qr-code').post(createQrcodeAsset);


module.exports = router;