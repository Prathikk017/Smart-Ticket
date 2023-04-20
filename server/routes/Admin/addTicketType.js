const express = require('express');
const router = express.Router();

const { addType } = require('../../controllers/Admin/addTicketType');

router.route('/tickettype').post(addType);

module.exports = router;
