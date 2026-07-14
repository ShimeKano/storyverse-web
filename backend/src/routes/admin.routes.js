const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authRequired } = require('../middleware/auth');
const manager = require('../middleware/manager');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));

router.post('/gift-hearts', authRequired, manager, adminController.giftHeartsToPlayer);
router.post('/stories/:id/review', authRequired, manager, adminController.reviewStory);

module.exports = router;
