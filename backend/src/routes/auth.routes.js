const express = require('express');
const authController = require('../controllers/auth.controller');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false, validate: { ip: false } }));

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
