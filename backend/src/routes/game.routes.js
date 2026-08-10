const express = require('express');
const gameController = require('../controllers/game.controller');
const { authRequired } = require('../middleware/auth');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false, validate: { ip: false }, keyGenerator(req) { return req.ip.replace(/:\d+$/, ''); } }));

router.get('/:storyId/start', authRequired, gameController.start);
router.post('/:storyId/choice', authRequired, gameController.choose);

module.exports = router;
