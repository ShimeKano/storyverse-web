const { AppError } = require('../lib/errors');
const { mutateLocalData } = require('./data.service');

class UserService {
  async getAllUsers() {
    return mutateLocalData(async (db) =>
      db.users
        .map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          isBanned: user.isBanned,
          createdAt: user.createdAt
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }

  async toggleBanUser(targetUserId, isBanned) {
    return mutateLocalData(async (db) => {
      const user = db.users.find((entry) => entry.id === Number(targetUserId));
      if (!user) {
        throw new AppError('User not found', 404);
      }

      user.isBanned = Boolean(isBanned);
      return user;
    });
  }
}

module.exports = new UserService();
