const profileService = require("../services/profile.service");

class AdminController {
  async giftHeartsToPlayer(req, res, next) {
    try {
      const { targetUserId, amount } = req.body;

      if (!targetUserId || !amount) {
        return res.status(400).json({ message: "targetUserId and amount are required" });
      }

      // Admin cấp tim thì cho phép tràn tim (allowOverflow = true)
      const updatedHearts = await profileService.addHearts(targetUserId, parseInt(amount), true);

      res.status(200).json({
        message: `Successfully gifted ${amount} hearts to user ID ${targetUserId}! 🎁`,
        data: updatedHearts
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();