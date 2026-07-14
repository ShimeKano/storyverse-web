const express = require('express');
const storyController = require('../controllers/story.controller');
const { authRequired, authOptional } = require('../middleware/auth');

const router = express.Router();

router.get('/', authOptional, storyController.list);
router.get('/:id', authOptional, storyController.getById);
router.post('/', authRequired, storyController.create);
router.put('/:id', authRequired, storyController.update);
router.post('/:id/submit', authRequired, storyController.submit);
router.delete('/:id', authRequired, storyController.remove);

module.exports = router;
