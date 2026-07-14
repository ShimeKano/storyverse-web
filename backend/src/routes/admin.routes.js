const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authRequired } = require('../middleware/auth');
const manager = require('../middleware/manager');

const router = express.Router();

router.post('/gift-hearts', authRequired, manager, adminController.giftHeartsToPlayer);
router.post('/stories/:id/review', authRequired, manager, adminController.reviewStory);

module.exports = router;
