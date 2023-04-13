const express = require('express');
const router = express.Router();

const {
	getTransID,
	getPaymentInfo,
} = require('../../controllers/Transaction/transaction');

router.route('/id').post(getTransID);
router.route('/pay').post(getPaymentInfo);

module.exports = router;
