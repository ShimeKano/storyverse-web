const express = require('express');
const rankingController = require('../controllers/ranking.controller');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));

router.get('/', rankingController.list);

module.exports = router;
