const express = require('express');
const rankingController = require('../controllers/ranking.controller');

const createApiRateLimit = require('../middleware/apiRateLimit');
const router = express.Router();
router.use(createApiRateLimit());

router.get('/', rankingController.list);

module.exports = router;
