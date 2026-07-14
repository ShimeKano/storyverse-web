const userService = require('../services/user.service');
const { AppError } = require('../lib/errors');

class UserController {
  async listAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ message: 'Fetch users successfully', data: users });
    } catch (error) {
      next(error);
    }
  }

  async updateBanStatus(req, res, next) {
    try {
      const { targetUserId, isBanned } = req.body;
      if (!targetUserId) {
        throw new AppError('targetUserId is required', 400);
      }

      if (Number(targetUserId) === req.user.id) {
        throw new AppError('You cannot ban yourself', 400);
      }

      const user = await userService.toggleBanUser(targetUserId, isBanned);
      res.status(200).json({ message: 'User ban status updated', data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
