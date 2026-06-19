const userService = require("../services/user.service");

class UserController {
  // Admin/Manager lấy danh sách tất cả người dùng
  async listAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        message: "Fetch all users successfully",
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  // Admin/Manager thực hiện khóa hoặc mở khóa tài khoản
  async updateBanStatus(req, res, next) {
    try {
      const { targetUserId, isBanned } = req.body;
      if (targetUserId === req.user.id) {
        return res.status(400).json({ message: "You cannot ban yourself!" });
      }

      await userService.toggleBanUser(targetUserId, isBanned);
      res.status(200).json({
        message: `User status updated successfully. Banned: ${isBanned}`
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();