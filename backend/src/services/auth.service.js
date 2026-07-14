const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { AppError } = require('../lib/errors');
const {
  validateRegisterInput,
  validateLoginInput,
  normalizeRole
} = require('../utils/validators');
const { mutateLocalData } = require('./data.service');

class AuthService {
  async registerUser(payload) {
    validateRegisterInput(payload);

    return mutateLocalData(async (db) => {
      const username = payload.username.trim();
      const email = payload.email.trim().toLowerCase();
      const exists = db.users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === email
      );

      if (exists) {
        throw new AppError('Username or email already exists', 409);
      }

      const role = normalizeRole(payload.role || 'PLAYER');
      const passwordHash = await bcrypt.hash(payload.password, 10);
      const newUserId = db.meta.nextIds.users;
      db.meta.nextIds.users += 1;

      const user = {
        id: newUserId,
        username,
        email,
        passwordHash,
        role,
        isVerified: true,
        isBanned: false,
        createdAt: new Date().toISOString()
      };

      db.users.push(user);
      db.profiles.push({
        userId: newUserId,
        displayName: username,
        avatarUrl: '',
        level: 1,
        exp: 0,
        gold: 0,
        diamond: 0
      });
      db.hearts.push({
        userId: newUserId,
        currentHearts: 5,
        maxHearts: 5,
        lastRecoverTime: new Date().toISOString()
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    });
  }

  async loginUser(payload) {
    validateLoginInput(payload);

    return mutateLocalData(async (db) => {
      const credential = payload.usernameOrEmail.trim().toLowerCase();
      const user = db.users.find(
        (candidate) =>
          candidate.username.toLowerCase() === credential || candidate.email.toLowerCase() === credential
      );

      if (!user) {
        throw new AppError('Invalid username/email or password', 401);
      }

      if (user.isBanned) {
        throw new AppError('Your account has been banned', 403);
      }

      const validPassword = await bcrypt.compare(payload.password, user.passwordHash);
      if (!validPassword) {
        throw new AppError('Invalid username/email or password', 401);
      }

      const profile = db.profiles.find((item) => item.userId === user.id) || null;
      const hearts = db.hearts.find((item) => item.userId === user.id) || null;

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile,
          hearts
        }
      };
    });
  }
}

module.exports = new AuthService();
