const express = require('express');
const gameController = require('../controllers/game.controller');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/:storyId/start', authRequired, gameController.start);
router.post('/:storyId/choice', authRequired, gameController.choose);

module.exports = router;
