const rankingService = require('../services/ranking.service');

class RankingController {
  async list(req, res, next) {
    try {
      const rankings = await rankingService.getLeaderboard();
      res.status(200).json({ message: 'Leaderboard fetched successfully', data: rankings });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RankingController();
