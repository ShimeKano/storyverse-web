const express = require('express');
const profileController = require('../controllers/profile.controller');
const { authRequired } = require('../middleware/auth');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false, validate: { ip: false }, keyGenerator(req) { return req.ip.replace(/:\d+$/, ''); } }));

router.get('/me', authRequired, profileController.getMyProfile);
router.put('/me', authRequired, profileController.updateMyProfile);

module.exports = router;
