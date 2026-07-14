const express = require('express');
const userController = require('../controllers/user.controller');
const { authRequired } = require('../middleware/auth');
const manager = require('../middleware/manager');

const router = express.Router();

router.get('/', authRequired, manager, userController.listAllUsers);
router.post('/ban', authRequired, manager, userController.updateBanStatus);

module.exports = router;
