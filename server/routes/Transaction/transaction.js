const express = require('express');
const router = express.Router();

const {
	getTransID,
	getPaymentInfo,
	createTransQR,
	transQRVerify,
	getHistory,
} = require('../../controllers/Transaction/transaction');

router.route('/id').post(getTransID);
router.route('/pay').post(getPaymentInfo);
router.route('/qr').post(createTransQR);
router.route('/qrverify').post(transQRVerify);
router.route('/history').post(getHistory);

module.exports = router;
