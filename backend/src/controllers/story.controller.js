const storyService = require('../services/story.service');

class StoryController {
  async list(req, res, next) {
    try {
      const stories = await storyService.listStories({
        user: req.user || null,
        type: req.query.type,
        status: req.query.status,
        includeOwnDrafts: String(req.query.includeOwnDrafts || 'false') === 'true'
      });
      res.status(200).json({ message: 'Stories fetched successfully', data: stories });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const story = await storyService.getStoryDetail(req.params.id, req.user || null);
      res.status(200).json({ message: 'Story fetched successfully', data: story });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const story = await storyService.createStory(req.user, req.body);
      res.status(201).json({ message: 'Story created successfully', data: story });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const story = await storyService.updateStory(req.user, req.params.id, req.body);
      res.status(200).json({ message: 'Story updated successfully', data: story });
    } catch (error) {
      next(error);
    }
  }

  async submit(req, res, next) {
    try {
      const story = await storyService.submitStory(req.user, req.params.id);
      res.status(200).json({ message: 'Story submitted for review', data: story });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await storyService.removeStory(req.user, req.params.id);
      res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StoryController();
