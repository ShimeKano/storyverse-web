const gameService = require('../services/game.service');

class GameController {
  async start(req, res, next) {
    try {
      const data = await gameService.startStory(req.user, req.params.storyId);
      res.status(200).json({ message: 'Story started', data });
    } catch (error) {
      next(error);
    }
  }

  async choose(req, res, next) {
    try {
      const data = await gameService.choose(req.user, req.params.storyId, req.body);
      res.status(200).json({ message: 'Choice accepted', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GameController();
