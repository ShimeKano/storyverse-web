const profileService = require('../services/profile.service');
const storyService = require('../services/story.service');

class AdminController {
  async giftHeartsToPlayer(req, res, next) {
    try {
      const { targetUserId, amount, allowOverflow } = req.body;
      const updated = await profileService.addHearts(targetUserId, amount, Boolean(allowOverflow));
      res.status(200).json({ message: 'Hearts updated successfully', data: updated });
    } catch (error) {
      next(error);
    }
  }

  async reviewStory(req, res, next) {
    try {
      const story = await storyService.reviewStory(req.user, req.params.id, req.body);
      res.status(200).json({ message: 'Story reviewed successfully', data: story });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
