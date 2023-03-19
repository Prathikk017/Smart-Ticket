const express = require('express');
const router = express.Router();

const { FAQs } = require('../../controllers/FAQs/FAQs');

router.route('/').get(FAQs);

module.exports = router;
