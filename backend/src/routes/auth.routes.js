const express = require('express');
const authController = require('../controllers/auth.controller');

const createApiRateLimit = require('../middleware/apiRateLimit');
const router = express.Router();
router.use(createApiRateLimit());

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
