const express = require('express');
const router = express.Router();

const { Profile, Edit } = require('../../controllers/Profile/profile');

router.route('/').post(Profile);
router.route('/edit').post(Edit);

module.exports = router;
