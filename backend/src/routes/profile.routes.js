const express = require('express');
const profileController = require('../controllers/profile.controller');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authRequired, profileController.getMyProfile);
router.put('/me', authRequired, profileController.updateMyProfile);

module.exports = router;
