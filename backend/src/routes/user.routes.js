const express = require('express');
const userController = require('../controllers/user.controller');
const { authRequired } = require('../middleware/auth');
const manager = require('../middleware/manager');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));

router.get('/', authRequired, manager, userController.listAllUsers);
router.post('/ban', authRequired, manager, userController.updateBanStatus);

module.exports = router;
