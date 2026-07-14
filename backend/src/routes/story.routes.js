const express = require('express');
const storyController = require('../controllers/story.controller');
const { authRequired, authOptional } = require('../middleware/auth');

const rateLimit = require('express-rate-limit');
const router = express.Router();
router.use(rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false }));

router.get('/', authOptional, storyController.list);
router.get('/:id', authOptional, storyController.getById);
router.post('/', authRequired, storyController.create);
router.put('/:id', authRequired, storyController.update);
router.post('/:id/submit', authRequired, storyController.submit);
router.delete('/:id', authRequired, storyController.remove);

module.exports = router;
